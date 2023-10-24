import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appLazyLoading]',
})
export class LazyLoadingDirective implements AfterViewInit, OnDestroy {
  @Output() appInView: EventEmitter<any> = new EventEmitter<boolean>();
  observer$!: IntersectionObserver;
  constructor(private readonly elementRef: ElementRef) {}

  public ngAfterViewInit(): void {
    const observedElement = this.elementRef.nativeElement;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    this.observer$ = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.appInView.emit();
      }
    }, options);
    this.observer$.observe(observedElement);
  }

  public ngOnDestroy(): void {
    this.observer$.disconnect();
  }
}
