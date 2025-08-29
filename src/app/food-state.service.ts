import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FoodItem } from './food-serv-parser.service';

@Injectable({
  providedIn: 'root'
})
export class FoodStateService {
  private criteriaSubject = new BehaviorSubject<{ product: string; category: string } | null>(null);
  criteria$ = this.criteriaSubject.asObservable();

  private selectedItem$ = new BehaviorSubject<FoodItem | null>(null);

  setCriteria(criteria: { product: string; category: string } | null) {
    // Нормируем вход (Жесткая проверка БЕЗ undefined)
    const normalization = criteria ? { product: (criteria.product || '').trim(), category: (criteria.category || '').trim() } : null;
    this.criteriaSubject.next(normalization);
  }

  setSelectedItem(item: FoodItem | null) {
    this.selectedItem$.next(item);
  }

  getSelectedItem() {
    return this.selectedItem$.asObservable();
  }
}
