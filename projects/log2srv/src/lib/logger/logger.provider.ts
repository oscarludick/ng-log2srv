import { HttpBackend } from '@angular/common/http';
import { Provider } from '@angular/core';

import { LoggerWrapperService } from './logger-wrapper.service';

import { provideLoggerParser } from './parser';
import { HttpLogger, provideHttpLogger } from './http';

import { CONFIGURATION_TOKEN } from '../config';
import { Log2SrvConfig } from '../log2srv.config';
import { provideConsoleLogger } from './console/console-logger.provider';
import { ConsoleLogger } from './console';

export function provideLogger(config: Log2SrvConfig): Provider[] {
  return [
    provideConsoleLogger(),
    provideLoggerParser(config),
    provideHttpLogger(config),
    {
      provide: LoggerWrapperService,
      useFactory: (
        httpBackend: HttpBackend,
        httpLogger: HttpLogger,
        consoleLogger: ConsoleLogger,
        log2SrvConfig: Log2SrvConfig
      ) => {
        return new LoggerWrapperService(
          httpBackend,
          httpLogger,
          consoleLogger,
          log2SrvConfig
        );
      },
      deps: [HttpBackend, HttpLogger, ConsoleLogger, CONFIGURATION_TOKEN],
    },
  ];
}
