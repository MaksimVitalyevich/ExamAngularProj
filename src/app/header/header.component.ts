import { Component } from '@angular/core';
import {FormGroup, ReactiveFormsModule, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchForm = new FormGroup({
    inputFood: new FormControl('', Validators.required)
  });

  formattedFoodStr: string = '';

  printOutFood() {
    console.log('Введено значение:', this.searchForm.value)
    alert("Строка записана!")
  }
}
