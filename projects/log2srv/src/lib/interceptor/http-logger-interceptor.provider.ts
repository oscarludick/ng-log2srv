import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

import { HttpLoggerInterceptor } from './http-logger.interceptor';

export function provideHttpLoggerInterceptor(): Provider[] {
  return [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoggerInterceptor,
      multi: true,
    }
  ];
}
