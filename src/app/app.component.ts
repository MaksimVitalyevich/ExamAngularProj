import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { FoodItem } from './food-serv-parser.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AdBannerComponent, BodyComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FoodFactParser';

  criteria: { product: string; category: string } | null = null;
  items: FoodItem[] = [];
  selectedItem: FoodItem | null = null;

  onSearch(value: { product: string; category: string }) {
    this.criteria = value; // Делаем перезапись строки из поиска
  }
}
