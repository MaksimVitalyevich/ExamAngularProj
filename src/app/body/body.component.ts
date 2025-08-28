import { Component, Input, Output, OnChanges, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FoodItem, FoodServParserService } from '../food-serv-parser.service';
import { MatPaginator } from '@angular/material/paginator';
import { FoodDirDirective } from '../food-dir.directive';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [MatTableModule, MatPaginator, FoodDirDirective],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnChanges {
  @Input() items: FoodItem[] = [];
  @Input() foundCriteria: { product: string, category: string;} | null = null;
  @Output() showDetails = new EventEmitter<FoodItem>();

  displayedColumns: string[] = ['productName', 'category', 'actions'];
  dataSource = new MatTableDataSource<FoodItem>([]);
  totalItems = 0;

  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private foodService: FoodServParserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.dataSource.data = this.items;
      this.loadData();
    }
  }

  openDetails(item: FoodItem) {
    this.showDetails.emit(item);
  }

  loadData() {
    const { product, category } = this.foundCriteria ?? { product: '', category: ''};
    this.foodService.searchFoods(product, category, this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.dataSource.data = response.items;
      this.totalItems = response.total;
    })
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }
}
