import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { AbstractLoggerModel } from '../logger.model';

export type HttpLoggerModel = new (...args: any[]) => HttpLogger;

export abstract class HttpLogger {
  abstract sendLog(
    loggerModel: AbstractLoggerModel
  ): HttpRequest<AbstractLoggerModel>;
}

export type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export interface HttpConfigModel {
  params?: HttpParams | { [param: string]: string | string[] };
  headers?:
    | HttpHeaders
    | {
        [key: string]: any;
      };
  endpoint: string;
  responseType?: HttpResponseType;
  credentials?: boolean;
}
