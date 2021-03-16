import { Provider } from '@angular/core';

import { HttpLogger } from './http-logger.model';
import { HTTP_LOGGER_TOKEN } from './http-logger.token';
import { HttpLoggerService } from './http-logger.service';

import { Log2SrvConfig } from '../../log2srv.config';

export function provideHttpLogger(config: Log2SrvConfig): Provider[] {
  return [
    {
      provide: HTTP_LOGGER_TOKEN,
      useValue: config.http,
    },
    {
      provide: HttpLogger,
      useClass: config.httpLogger || HttpLoggerService,
    },
  ];
}
