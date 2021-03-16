import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoggerModel } from '../../../logger.model';
import { ParserModel } from '../parser.model';

@Injectable()
export class HttpDefaultParserService extends ParserModel {
  parse(
    loggerModel: LoggerModel,
    httpEvent: HttpRequest<any> | HttpResponse<any> | HttpErrorResponse
  ): LoggerModel {
    return {
      ...loggerModel,
      message: `Event captured in ${httpEvent.url}`,
    };
  }
}
