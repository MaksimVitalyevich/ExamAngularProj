import { Component, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  searchForm = new FormGroup({
    inputFood: new FormControl('', Validators.required),
    inputCategory: new FormControl('', Validators.required)
  });

  @Output() search = new EventEmitter<{ product: string; category: string}>(); // Событие для передачи данных от одного места в другое

  printOutFood() {
    if (this.searchForm.valid) {
      const value = this.searchForm.value.inputFood ?? '';
      const catValue = this.searchForm.value.inputCategory ?? '';
      
      console.log('Введены значения:', value, catValue);

      this.search.emit({
        product: this.searchForm.value.inputFood ?? '',
        category: this.searchForm.value.inputCategory ?? ''
      }) // Передаем извне, в другой компонент
    } else {
      alert('Внимание: Введено некорректное значение! Попробуйте снова.');
    }
  }
}
