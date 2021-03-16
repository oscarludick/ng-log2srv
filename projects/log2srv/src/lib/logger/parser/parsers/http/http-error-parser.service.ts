import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoggerModel } from '../../../logger.model';
import { ParserModel } from '../parser.model';

@Injectable()
export class HttpErrorParserService extends ParserModel {
  parse(loggerModel: LoggerModel, httpEvent: HttpErrorResponse): LoggerModel {
    return {
      ...loggerModel,
      message: httpEvent.message,
    };
  }
}
