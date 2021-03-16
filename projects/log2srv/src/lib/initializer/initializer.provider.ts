import { DatePipe } from '@angular/common';
import { APP_INITIALIZER, Provider } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { DOCUMENT_TOKEN, LOCATION_TOKEN, NAVIGATOR_TOKEN } from './tokens';

import { LoadIPService, UUID_TOKEN } from './uuid';

export function provideInitializer(): Provider[] {
  return [
    DatePipe,
    LoadIPService,
    {
      provide: UUID_TOKEN,
      useValue: new BehaviorSubject('APP_INITIALIZER').pipe(shareReplay(2)),
    },
    {
      provide: DOCUMENT_TOKEN,
      useValue: document,
    },
    {
      provide: NAVIGATOR_TOKEN,
      useValue: navigator,
    },
    {
      provide: LOCATION_TOKEN,
      useValue: location,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (loadIP: LoadIPService) => () => {
        loadIP.load().toPromise();
      },
      deps: [LoadIPService],
      multi: true,
    },
  ];
}
