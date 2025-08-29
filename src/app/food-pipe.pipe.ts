import { Pipe, PipeTransform } from '@angular/core';
import { FoodItem } from './food-serv-parser.service';

@Pipe({
  name: 'foodPipe',
  standalone: true
})
export class FoodPipePipe implements PipeTransform {

  transform(items: FoodItem[], criteria: { product?: string | undefined, category?: string | undefined} | null): {results: FoodItem[], count: number} {
    if (!items || !criteria) return {results: items ?? [], count: 0};

    const productSearch = criteria.product?.toLowerCase() ?? '';
    const categorySearch = criteria.category?.toLowerCase() ?? '';

    const results = items.filter(item => {
      const matchProd = productSearch ? item.product.toLowerCase().includes(productSearch) : true;
      const matchCat = categorySearch ? item.category.toLowerCase().includes(categorySearch) : true;
      return matchProd && matchCat;
    });

    return { results, count: results.length };
  }

}
