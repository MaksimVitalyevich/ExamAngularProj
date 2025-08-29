import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FoodItem, FoodServParserService } from '../food-serv-parser.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FoodDirDirective } from '../food-dir.directive';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, combineLatest, catchError, of, filter, switchMap, takeUntil, tap } from 'rxjs';
import { FoodStateService } from '../food-state.service';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { AdditionalInfoComponent } from '../additional-info/additional-info.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [MatTableModule, MatPaginator, FoodDirDirective, CommonModule, MatSortHeader, AdditionalInfoComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent implements AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['product', 'category', 'actions'];
  dataSource = new MatTableDataSource<FoodItem>([]);
  totalItems = 0;
  pageSize = 10;
  hasResultsTaken = false;

  criteria: { product: string; category: string } | null = null;
  selectedItem: FoodItem | null = null;

  private page$ = new BehaviorSubject<{ pageIndex: number; pageSize: number }>({ pageIndex: 0, pageSize: this.pageSize });
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private state: FoodStateService, private api: FoodServParserService) {}

  ngOnInit(): void {
    this.state.criteria$.pipe(
      takeUntil(this.destroy$)).subscribe(c => {
        this.criteria = c;
    });

    this.state.getSelectedItem()
    .pipe(takeUntil(this.destroy$))
    .subscribe(item => this.selectedItem = item);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, prop) => (item as any)[prop]?.toString().toLowerCase() ?? '';

    // Критерии меняются? - сбрасываем все к 0!
    this.state.criteria$.pipe(
      takeUntil(this.destroy$),
      tap(criteria => {
        if (criteria) {
          this.page$.next({ pageIndex: 0, pageSize: this.pageSize });
        } else {
          // null = очистка таблицы
          this.dataSource.data = [];
          this.totalItems = 0;
          this.hasResultsTaken = false;
        }
      })
    ).subscribe();

    this.loadPipeLine();
  }

  private loadData(criteria: { product: string; category: string}, page: { pageIndex: number; pageSize: number}) {
    return this.api.searchFoods(criteria!.product ?? '', criteria!.category ?? '', 
      page.pageIndex + 1, page.pageSize).pipe(catchError(err => { console.error('Ошибка поиска', err); return of({ items: [], total: 0 });
    })
  );
  }

  applyResults(items: FoodItem[], total: number) {
    this.dataSource.data = items;
    this.totalItems = total;
  }

  private loadPipeLine(): void {
    // Комбайн критерии и страницы, при наличии хотя бы одного пустого поля
    // combineLatest + switchMap — отменяет предыдущие запросы, если критерии/страница поменялись.
    combineLatest([this.state.criteria$, this.page$]).pipe(
      takeUntil(this.destroy$),
      filter(([criteria, page]) => !!criteria && ((criteria.product !== '') || (criteria.category !== ''))),
      switchMap(([criteria, page]) => this.loadData(criteria!, page)), tap(result => {
    this.applyResults(result.items, result.total);
    // При наличии paginator'а и страница больше допустимой - сбрасываем
    if (this.paginator) {
      const maxPageIndex = Math.max(0, Math.ceil(this.totalItems / this.pageSize) - 1);
      if (this.paginator.pageIndex > maxPageIndex) {
        this.paginator.firstPage();
      }
    }
  })
    ).subscribe();
  }

  trackById = (_: number, item: FoodItem) => item.id;

  onPage(event: PageEvent) {
    this.page$.next({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }

  openDetails(item: FoodItem) {
    if (!item) return;
    this.state.setSelectedItem(item);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
