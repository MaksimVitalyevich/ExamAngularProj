import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodPipe',
  standalone: true
})
export class FoodPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
