import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FoodItem {
  productName: string;
  manufacturer: string;
  category: string;
  dateReleased: string;
  rating: number;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodServParserService {
  private fakeApiUrl = 'http://localhost:3000/food';

  constructor(private httpClient: HttpClient) { }

  getFoodByName(name: string): Observable<FoodItem[]> {
    return this.httpClient.get<FoodItem[]>(`${this.fakeApiUrl}?name=${name}`);
  }

  addFoodByName(name: string, food: FoodItem): Observable<FoodItem> {
    return this.httpClient.post<FoodItem>(this.fakeApiUrl, {... food, name});
  }

  updateFoodByName(name: string, food: FoodItem): Observable<FoodItem> {
    return this.httpClient.put<FoodItem>(`${this.fakeApiUrl}/${name}`, food);
  }

  deleteFoodByName(name: string): Observable<FoodItem> {
    return this.httpClient.delete<FoodItem>(`${this.fakeApiUrl}/${name}`);
  }
}
