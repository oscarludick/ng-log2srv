import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'event-wrapper',
  template: `<log2srv #componentRef></log2srv>`,
})
export class EventWrapperComponent {
  @ViewChild('componentRef', { read: ElementRef, static: true })
  public readonly elementRef: ElementRef | undefined;
}
