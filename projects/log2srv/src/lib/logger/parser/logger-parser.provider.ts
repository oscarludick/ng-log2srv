import { Provider } from '@angular/core';

import { provideParsers } from './parsers';
import { LoggerParser } from './logger-parser';

import { LoggerParserService } from './logger-parser.service';
import { Log2SrvConfig } from '../../log2srv.config';

export function provideLoggerParser(config: Log2SrvConfig): Provider[] {
  return [
    provideParsers(config.events!),
    {
      provide: LoggerParser,
      useClass: LoggerParserService,
    },
  ];
}
