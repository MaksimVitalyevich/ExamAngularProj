import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFoodHighlight]',
  standalone: true
})
export class FoodDirDirective implements OnChanges {
  @Input() appFoodHighlight: string | undefined;
  @Input() source: string = '';
  @Input() highlightColor: string = 'yellow';

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    if (!this.appFoodHighlight) {
      this.el.nativeElement.innerHTML = this.source;
      return;
    }
    const regex = new RegExp(`(${this.appFoodHighlight})`, 'gi');
    this.el.nativeElement.innerHTML = this.source.replace(regex, `<span style="background-color:${this.highlightColor}">$1</span>`);
  }
}
