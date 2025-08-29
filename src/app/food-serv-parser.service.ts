import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

export interface FoodItem {
  product: string;
  manufacturer: string;
  category: string;
  dateReleased: string;
  rating: number;
  id: string;
}

export const FOOD_MOCKS: FoodItem[] = [
  { product: 'Apple Juice', category: 'Beverage', manufacturer: 'Juice Co', dateReleased: '2022-01-01', rating: 8, id: '1' },
  { product: 'Orange Juice', category: 'Beverage', manufacturer: 'Citrus Inc', dateReleased: '2021-05-10', rating: 7, id: '2' },
  { product: 'Chocolate Bar', category: 'Snack', manufacturer: 'Sweet Ltd', dateReleased: '2020-12-15', rating: 9, id: '3' }
]

@Injectable({ providedIn: 'root' })
export class FoodServParserService {
  private fakeApiUrl = 'http://localhost:3000/food';

  constructor(private httpClient: HttpClient) { }

  // Поиск по названию продукта
  getFoods(): Observable<FoodItem[]> {
    return this.httpClient.get<FoodItem[]>(this.fakeApiUrl).pipe(
      catchError(err => { 
        console.error('Ошибка загрузки db.json', err); 
        return of([]); 
      })
    );
  }
}
