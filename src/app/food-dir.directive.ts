import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appFoodHighlight]',
  standalone: true
})
export class FoodDirDirective implements OnChanges {
  @Input('appFoodHighlight') searchText: string | undefined;
  @Input() highlightColor: string = 'yellow';

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    const originalText = this.element.nativeElement.textContext;
    if (!this.searchText) {
      this.renderer.setProperty(this.element.nativeElement, 'innerHTML', originalText);
      return;
    }

    const regular = new RegExp(`(${this.escapeRegExp(this.searchText ?? '')})`, 'gi');
    const newText = originalText.replace(regular, `<span style="color:${this.highlightColor}; font-weight:bold;">$1</span>`);
    this.renderer.setProperty(this.element.nativeElement, 'innerHTML', newText);
  }

  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
