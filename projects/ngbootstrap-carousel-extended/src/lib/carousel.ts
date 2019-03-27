import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  QueryList,
  TemplateRef
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import {NgbCarouselConfig} from './carousel-config';

import {merge, Subject, timer} from 'rxjs';
import {filter, map, switchMap, takeUntil} from 'rxjs/operators';

let nextId = 0;

/**
 * Represents an individual slide to be used within a carousel.
 */
@Directive({selector: 'ng-template[ngbSlideExtended]'})
export class NgbSlideDirective {
  /**
   * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
   * Will be auto-generated if not provided.
   */
  @Input() id = `ngb-slide-${nextId++}`;
  constructor(public tplRef: TemplateRef<any>) {}
}

/**
 * Directive to easily create carousels based on Bootstrap's markup.
 */
@Component({
  selector: 'ngb-carousel-extended',
  exportAs: 'ngbCarousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'carousel slide',
    '[style.display]': '"block"',
    'tabIndex': '0',
    '(mouseenter)': 'pauseOnHover && pause()',
    '(mouseleave)': 'pauseOnHover && cycle()',
    '(keydown.arrowLeft)': 'keyboard && prev()',
    '(keydown.arrowRight)': 'keyboard && next()'
  },
  styles: [`
    .carousel-item {
      margin-right: 10px;
      width: unset;
    }
    .carousel-item.active {
      display: inline-block;
    }
  `],
  template: `
    <ol class="carousel-indicators" *ngIf="showNavigationIndicators && slides.length > previewSize">
      <li *ngFor="let i of slideIndexes" 
          [class.active]="i === activeIdx"
          (click)="select(i); pauseOnHover && pause()"></li>
    </ol>
    <div class="carousel-inner">
      <div *ngFor="let slide of slides; index as i" class="carousel-item"
           [class.active]="i === activeIdx || (i > activeIdx && i < activeIdx + previewSize)">
        <ng-container [ngTemplateOutlet]="slide.tplRef"></ng-container>
      </div>
    </div>
    <a class="carousel-control-prev" role="button" (click)="prev()" *ngIf="showNavigationArrows && slides.length > previewSize">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.previous">Previous</span>
    </a>
    <a class="carousel-control-next" role="button" (click)="next()" *ngIf="showNavigationArrows && slides.length > previewSize">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only" i18n="@@ngb.carousel.next">Next</span>
    </a>
  `
})
export class NgbCarousel implements AfterContentChecked,
    AfterContentInit, OnChanges, OnDestroy {
  @ContentChildren(NgbSlideDirective) slides: QueryList<NgbSlideDirective>;

  private _destroy$ = new Subject<void>();
  private _start$ = new Subject<void>();
  private _stop$ = new Subject<void>();

  /**
   * The active slide idx.
   */
  @Input() activeIdx: number;


  /**
   * Amount of time in milliseconds before next slide is shown.
   */
  @Input() interval: number;

  /**
   * Whether can wrap from the last to the first slide.
   */
  @Input() wrap: boolean;

  /**
   * A flag for allowing navigation via keyboard
   */
  @Input() keyboard: boolean;

  /**
   * A flag to enable slide cycling pause/resume on mouseover.
   * @since 2.2.0
   */
  @Input() pauseOnHover: boolean;

  /**
   * A flag to show / hide navigation arrows.
   * @since 2.2.0
   */
  @Input() showNavigationArrows: boolean;

  /**
   * A flag to show / hide navigation indicators.
   * @since 2.2.0
   */
  @Input() showNavigationIndicators: boolean;

  @Input() previewSize = 1;

  /**
   * A carousel slide event fired when the slide transition is completed.
   * See NgbSlideEvent for payload details
   */
  @Output() slide = new EventEmitter<NgbSlideEvent>();


  get slideIndexes(): number[] {
    if (this.slides && this.slides.length) {
      const result = this.slides.toArray()
        .map((v, i) => i)
        .filter(v => v % this.previewSize === 0);
      result[result.length - 1] = this.slides.length - this.previewSize;
      return result;
    }
    return [];
  }

  constructor(
      config: NgbCarouselConfig, @Inject(PLATFORM_ID) private _platformId, private _ngZone: NgZone,
      private _cd: ChangeDetectorRef) {
    this.interval = config.interval;
    this.wrap = config.wrap;
    this.keyboard = config.keyboard;
    this.pauseOnHover = config.pauseOnHover;
    this.showNavigationArrows = config.showNavigationArrows;
    this.showNavigationIndicators = config.showNavigationIndicators;
  }

  ngAfterContentInit() {
    // setInterval() doesn't play well with SSR and protractor,
    // so we should run it in the browser and outside Angular
    if (isPlatformBrowser(this._platformId)) {
      this._ngZone.runOutsideAngular(() => {
        this._start$
            .pipe(
                map(() => this.interval), filter(interval => interval > 0 && this.slides.length > 0),
                switchMap(interval => timer(interval).pipe(takeUntil(merge(this._stop$, this._destroy$)))))
            .subscribe(() => this._ngZone.run(() => this.next()));

        this._start$.next();
      });
    }

    this.slides.changes.pipe(takeUntil(this._destroy$)).subscribe(() => this._cd.markForCheck());
  }

  ngAfterContentChecked() {
    this.activeIdx = this.activeIdx >= 0 && this.activeIdx <= (this.slides.length - this.previewSize) ? this.activeIdx : 0;
  }

  ngOnDestroy() { this._destroy$.next(); }

  ngOnChanges(changes) {
    if ('interval' in changes && !changes['interval'].isFirstChange()) {
      this._start$.next();
    }
  }

  /**
   * Navigate to a slide with the specified identifier.
   */
  select(slideIdx: number) { this._cycleToSelected(slideIdx, this._getSlideEventDirection(this.activeIdx, slideIdx)); }

  /**
   * Navigate to the next slide.
   */
  prev() { this._cycleToSelected(this._getPrevSlide(this.activeIdx), NgbSlideEventDirection.RIGHT); }

  /**
   * Navigate to the next slide.
   */
  next() { this._cycleToSelected(this._getNextSlide(this.activeIdx), NgbSlideEventDirection.LEFT); }

  /**
   * Stops the carousel from cycling through items.
   */
  pause() { this._stop$.next(); }

  /**
   * Restarts cycling through the carousel slides from left to right.
   */
  cycle() { this._start$.next(); }

  private _cycleToSelected(slideIdx: number, direction: NgbSlideEventDirection) {
    if (slideIdx !== this.activeIdx) {
      this.slide.emit({prev: this.activeIdx, current: slideIdx, direction: direction});
      this._start$.next();
      this.activeIdx = slideIdx;
    }

    // we get here after the interval fires or any external API call like next(), prev() or select()
    this._cd.markForCheck();
  }

  private _getSlideEventDirection(currentActiveSlideIdx: number, nextActiveSlideIdx: number): NgbSlideEventDirection {
    return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
  }

  private _getNextSlide(currentSlideIdx: number): number {
    const slideIndexes = this.slideIndexes;
    const lastValidSlideIdx = slideIndexes[slideIndexes.length - 1];

    const isLastSlide = currentSlideIdx === lastValidSlideIdx;
    if (isLastSlide) {
      return this.wrap ? 0 : currentSlideIdx;
    }

    return slideIndexes[slideIndexes.findIndex(v => v === currentSlideIdx) + 1];
  }

  private _getPrevSlide(currentSlideIdx: number): number {
    const slideIndexes = this.slideIndexes;
    const isFirstSlide = currentSlideIdx === 0;

    return isFirstSlide ? (this.wrap ? slideIndexes[slideIndexes.length - 1] : 0) :
      slideIndexes[slideIndexes.findIndex(v => v === currentSlideIdx) - 1];
  }
}

/**
 * The payload of the slide event fired when the slide transition is completed
 */
export interface NgbSlideEvent {
  /**
   * Previous slide idx
   */
  prev: number;

  /**
   * New slide idx
   */
  current: number;

  /**
   * Slide event direction
   */
  direction: NgbSlideEventDirection;
}

/**
 * Enum to define the carousel slide event direction
 */
export enum NgbSlideEventDirection {
  LEFT = <any>'left',
  RIGHT = <any>'right'
}

export const NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlideDirective];
