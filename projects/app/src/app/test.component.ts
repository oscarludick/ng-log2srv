import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'test-component',
  template: `<h1>This is a test component</h1>`
})

export class TestComponent implements OnInit {
  constructor() { }

  async ngOnInit() {
    await from([]).pipe(delay(3000)).toPromise()
  }
}
