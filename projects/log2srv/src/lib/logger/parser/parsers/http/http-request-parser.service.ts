import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoggerModel } from '../../../logger.model';
import { ParserModel } from '../parser.model';

@Injectable()
export class HttpRequestParserService extends ParserModel {
  parse(loggerModel: LoggerModel, httpEvent: HttpRequest<any>): LoggerModel {
    return {
      ...loggerModel,
      message: JSON.stringify(httpEvent.body) || JSON.stringify({}),
    };
  }
}
