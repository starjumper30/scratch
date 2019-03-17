import { Directive, TemplateRef, ViewContainerRef, OnChanges, Input } from '@angular/core';

@Directive({
  selector: '[libNoobFor]'
})
export class NoobForDirective implements OnChanges {

  @Input() libNoobForIn: any[];
  @Input() libNoobForIf: (noobIf) => boolean;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) { }

  ngOnChanges() {
    this.viewContainerRef.clear();
    if (Array.isArray(this.libNoobForIn)) {
      this.libNoobForIn
        .filter(item => !this.libNoobForIf || this.libNoobForIf(item))
        .forEach((item, index) => {
          const context = {
            $implicit: item,
            index
          };
          this.viewContainerRef.createEmbeddedView(this.templateRef, context);
        });
    }
  }
}

