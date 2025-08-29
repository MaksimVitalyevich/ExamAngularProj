import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FoodItem } from './food-serv-parser.service';

@Injectable({
  providedIn: 'root'
})
export class FoodStateService {
  private criteriaSubject = new BehaviorSubject<{ product: string; category: string }>({ product: '', category: '' });
  criteria$ = this.criteriaSubject.asObservable();

  setCriteria(c: { product: string; category: string }) {
    this.criteriaSubject.next(c);
  }

  get criteria(): { product: string; category: string } {
    return this.criteriaSubject.getValue();
  }

  private selectedItemSubject = new BehaviorSubject<FoodItem | null>(null);
  selectedItem$ = this.selectedItemSubject.asObservable();

  setSelectedItem(item: FoodItem) {
    this.selectedItemSubject.next(item);
  }
}
