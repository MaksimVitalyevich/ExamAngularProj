import { Component, AfterViewInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FoodItem, FoodServParserService } from '../food-serv-parser.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FoodDirDirective } from '../food-dir.directive';
import { FoodPipePipe } from '../food-pipe.pipe';
import { CommonModule } from '@angular/common';
import { FoodStateService } from '../food-state.service';
import { AdditionalInfoComponent } from '../additional-info/additional-info.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [MatTableModule, MatPaginator, FoodDirDirective, FoodPipePipe, CommonModule, AdditionalInfoComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyComponent implements AfterViewInit {

  displayedColumns = ['product', 'category', 'actions'];
  dataSource = new MatTableDataSource<FoodItem>([]);
  selectedItem: FoodItem | null = null;

  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  criteria: { product?: string; category?: string } | null = null;
  allItems: FoodItem[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private state: FoodStateService, private api: FoodServParserService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, prop) => (item as any)[prop]?.toString() ?? '';

    this.api.getFoods().subscribe(items => {
      this.allItems = items;
      this.totalItems = items.length;
      this.updateTable();
    });

    this.state.criteria$.subscribe(() => {
      this.pageIndex = 0; // сброс на первую страницу при новом поиске
      this.updateTable();
    });
  }

  updateTable() {
    const criteria = this.state.criteria; // последний критерий
    if (!criteria) return;

    let filtered = this.allItems.filter(f =>
      f.product.includes(criteria.product) &&
      f.category.includes(criteria.category)
    );

    const MAX_RESULTS = 50;
    if (filtered.length > MAX_RESULTS) {
      filtered = filtered.slice(0, MAX_RESULTS);
    }

    this.totalItems = filtered.length;

    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.dataSource.data = filtered.slice(start, end);
  }

  openDetails(item: FoodItem) {
    this.selectedItem = item;
    this.state.setSelectedItem(item);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    const currentCriteria = this.state.criteria;
    const filtered = this.allItems.filter(f =>
      f.product.includes(currentCriteria.product) &&
      f.category.includes(currentCriteria.category)
    );

    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.dataSource.data = filtered.slice(start, end);
  }
}
