import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

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
  searchFoods(product: string, category: string, page: number, limit: number) {
    let params: any = { _page: page, _limit: limit };
    if (product) params['product_like'] = product;
    if (category) params['category_like'] = category;

    return this.httpClient.get<FoodItem[]>(this.fakeApiUrl, {
      params, observe: 'response'}).pipe(map(response => ({items: response.body ?? [],
      total: Number(response.headers.get('X-Total-Count') ?? 0) }))
    );
  }
}
