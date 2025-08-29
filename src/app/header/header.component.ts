import { Component, } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms'
import { FoodStateService } from '../food-state.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  searchForm = new FormGroup({
    product: new FormControl(''),
    category: new FormControl('')
  });

  constructor(private state: FoodStateService) {}

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(value => {
        this.state.setCriteria({ product: value.product?.toUpperCase() ?? '', category: value.category?.toUpperCase() ?? '' });
      });
  }

  siteInfo() {
    alert('Food Product Parser - Парсер для любых продуктов по названиям и категориям, 2025');
  }

  openexternLink() {
    window.location.search = "https://github.com/andyklimczak/TheReportOfTheWeek-API"
  }
}
