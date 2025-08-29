import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFoodHighlight]',
  standalone: true
})
export class FoodDirDirective implements OnChanges {
  @Input('appFoodHighlight') term: string | undefined; // то, что ищем сейчас
  @Input() source: string = ''; // исходный текст
  @Input() highlightColor: string = 'yellow';

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(_: SimpleChanges): void {
    const base = this.source ?? '';
    const t = (this.term ?? '').trim();
    if (!t) {
      this.renderer.setProperty(this.element.nativeElement, 'innerText', base);
      return;
    }

    const regular = new RegExp(`(${this.escapeRegExp(t)})`, 'gi');
    const html = base.replace(regular, `<span style="color:${this.highlightColor}; font-weight:700;">$1</span>`);
    this.renderer.setProperty(this.element.nativeElement, 'innerHTML', html);
  }

  private escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
