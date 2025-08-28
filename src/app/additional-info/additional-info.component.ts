import { Component, Input } from '@angular/core';
import { FoodItem } from '../food-serv-parser.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-additional-info',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './additional-info.component.html',
  styleUrl: './additional-info.component.scss'
})
export class AdditionalInfoComponent {
  @Input() item: FoodItem | null = null;
}
