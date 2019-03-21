import { Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

export interface CarouselContent {
  $implicit: string;
  controller: {
    forward: () => void ;
    backward: () => void;
  };
}

@Directive({
  selector: '[libNoobCarousel]'
})
export class NoobCarouselDirective implements OnInit {

  constructor(private template: TemplateRef<CarouselContent>, private viewContrRef: ViewContainerRef) { }

  @Input() libNoobCarouselIn: any[];
  wolves: any[];
  // @Input('libNoobCarouselIn') wolves: any[]; why can't i just rename it here? can't understand
  context: CarouselContent | null = null;
  index = 0;
  ngOnInit(): void {
    if (Array.isArray(this.libNoobCarouselIn)) {
    this.wolves = this.libNoobCarouselIn;
    }
    this.context = {
      $implicit: this.wolves[0],
      controller: {
        forward: () => this.moveForward(),
        backward: () => this.moveBackward()
  }
  };
    this.viewContrRef.createEmbeddedView(this.template, this.context);
  }
  moveForward(): void {
   this.index++ ;
   if (this.index >= this.wolves.length) {
     this.index = 0 ;
   }
   this.setContext();
  }
  moveBackward(): void {
    this.index-- ;
    if (this.index < 0) {
      this.index = this.wolves.length - 1 ;
    }
    this.setContext();
  }
  setContext() {
    if (this.context) {
      this.context.$implicit = this.wolves[this.index];
    }
  }
  }

