import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface FoodItem {
  product: string;
  manufacturer: string;
  category: string;
  dateReleased: string;
  rating: number;
  id: string;
}

@Injectable({ providedIn: 'root' })
export class FoodServParserService {
  private fakeApiUrl = 'http://localhost:3000/food';

  constructor(private httpClient: HttpClient) { }

  // Поиск по названию продукта
  searchFoods(name: string, category: string, page: number, limit: number) {
    let params: any = { _page: page, _limit: limit };
    if (name) params['product_like'] = name;
    if (category) params['category_like'] = category;

    return this.httpClient.get<FoodItem[]>(this.fakeApiUrl, {
      params,
      observe: 'response'}).pipe(map(response => ({items: response.body ?? [],
      total: Number(response.headers.get('X-Total-Count') ?? 0)
    })));
  }

  // CRUD операции (обязательны для внутренней обработки для совпадении данных)
  getById(id: string): Observable<FoodItem> {
    return this.httpClient.get<FoodItem>(`${this.fakeApiUrl}/${id}`)
  }

  addFood(food: FoodItem): Observable<FoodItem> {
    return this.httpClient.post<FoodItem>(this.fakeApiUrl, food);
  }

  updateFoodByName(id: string, food: FoodItem): Observable<FoodItem> {
    return this.httpClient.put<FoodItem>(`${this.fakeApiUrl}/${id}`, food);
  }

  deleteFoodByName(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.fakeApiUrl}/${id}`);
  }
}
