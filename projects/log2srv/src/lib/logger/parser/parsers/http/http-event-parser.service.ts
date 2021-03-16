import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import {
  EventModel,
  HttpModel,
  LoggerTypesNames,
  AbstractLoggerModel,
} from '../../../logger.model';

import { ParserCommonService } from '../parser-common.service';

@Injectable()
export class HttpEventParserService {
  constructor(private readonly parserCommon: ParserCommonService) {}

  parseHttpEvent(
    httpEvent: HttpRequest<any> | HttpResponse<any> | HttpErrorResponse,
    url?: string,
    method?: string,
    latency?: number
  ): AbstractLoggerModel {
    const loggerModel = Object.assign(
      this.parserCommon.getDefaultModel(this.getHttpEvent(httpEvent)),
      { http: this.getHttpModel(httpEvent, url, method, latency) }
    );
    return this.parserCommon
      .getEventParser(loggerModel.event.name as LoggerTypesNames, 'http')
      .parse(loggerModel, httpEvent);
  }

  private getHttpEvent(
    event: HttpResponse<any> | HttpRequest<any> | HttpErrorResponse
  ): EventModel {
    return {
      type: 'HttpEvent',
      name:
        event instanceof HttpErrorResponse
          ? 'error'
          : event instanceof HttpRequest
          ? 'request'
          : 'response',
    };
  }

  private getHttpModel(
    httpEvent: HttpRequest<any> | HttpResponse<any> | HttpErrorResponse,
    url?: string,
    method?: string,
    latency?: number
  ): HttpModel {
    return {
      url: url || '',
      method: method || '',
      latency: latency || 0,
      headers: httpEvent.headers
        .keys()
        .map((k) => `${k}: ${httpEvent.headers.getAll(k)?.join(',')}`)
        .join(';'),
      status: httpEvent instanceof HttpRequest ? '0' : httpEvent.statusText,
    };
  }
}
