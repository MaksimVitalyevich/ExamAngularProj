import { Component, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms'
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
    product: new FormControl<string>(''),
    category: new FormControl<string>('')
  });

  constructor(private state: FoodStateService) {
    // Делаем живой поиск
    this.searchForm.get('product')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      const category = this.searchForm.get('category')!.value ?? '';
      // Отправляем нормированный строки (БЕЗ допуска undefined)
      this.state.setCriteria({ product: (value || '').trim(), category: (category || '').trim() });
    });

    this.searchForm.get('category')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      const product = this.searchForm.get('product')!.value ?? '';
      this.state.setCriteria({ product: (product || '').trim(), category: (value || '').trim() });
    })
  }

  // При комбинации getRawValue + trim - дает гарантию что НЕ попадут строки с типом undefined + отсечение лишних символов
  onSearch() {
    const { product, category } = this.searchForm.getRawValue();
    this.state.setCriteria({ product: (product || '').trim(), category: (category || '').trim() });
  }
}
