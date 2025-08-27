import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface FoodElement {
  productName: string;
  manufacturer: string;
  category: string;
  dateReleased: string;
  rating: number;
  id: string;
}

const FAKE_DATA: FoodElement[] = [
  {productName: '5 Hour Energy Pomegranate', manufacturer: 'Living Essentials', category: 'Energy Crisis', dateReleased: '2011-02-20', rating: 7, id: '0b399d91-1673-4708-ba60-f1312b037b35'},
  {productName: 'Monster Energy Drink Regular (green)', manufacturer: 'Monster Beverage', category: 'Energy Crisis', dateReleased: '2011-02-27', rating: 5, id: 'f207579a-7e97-45fe-8c86-dec74456107f'},
  {productName: 'Fuel', manufacturer: 'Living Essentials', category: 'Energy Crisis', dateReleased: '2011-03-06', rating: 2, id: 'aa1e5feb-a47b-4c89-b7cd-ae3c259b2f19'}
];

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  foundFood: string = '';

  displayedColumns: string[] = ['productName', 'manufacturer', 'category', 'dateReleased', 'rating', 'id'];
  dataSource = FAKE_DATA;
}
