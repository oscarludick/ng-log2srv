import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoggerModel } from '../../../logger.model';
import { ParserModel } from '../parser.model';

@Injectable()
export class HttpResponseParserService extends ParserModel {
  parse(loggerModel: LoggerModel, httpEvent: HttpResponse<any>): LoggerModel {
    return {
      ...loggerModel,
      message: JSON.stringify(httpEvent.body) || JSON.stringify({}),
    };
  }
}
