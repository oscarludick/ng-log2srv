import { Type } from '@angular/core';

import { LoggerTypesNames } from './logger';
import { HttpConfigModel, HttpLoggerModel } from './logger/http';
import { ParserModel } from './logger/parser';

export interface LoggerConfig {
  server?: boolean;
  console?: boolean;
}

export interface SingleEventConfig extends LoggerConfig {
  enabled: boolean;
  parser?: new (...args: any[]) => ParserModel;
}

export interface Log2SrvConfig {
  root?: Type<any>;
  timestamp?: string;
  loggerConfig?: LoggerConfig;
  httpLogger?: HttpLoggerModel;
  http?: HttpConfigModel;
  events?: {
    [K in LoggerTypesNames]?: SingleEventConfig;
  };
}
