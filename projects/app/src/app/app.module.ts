import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test.component';

import { Log2SrvModule } from 'projects/log2srv/src/public-api';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    Log2SrvModule.forRoot({
      root: AppComponent,
      events: {
        click: { enabled: true}
      },
    }),
    BrowserModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
