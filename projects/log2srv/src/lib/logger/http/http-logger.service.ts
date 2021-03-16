import { HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { HTTP_LOGGER_TOKEN } from './http-logger.token';
import { HttpConfigModel, HttpLogger } from './http-logger.model';
import { AbstractLoggerModel } from '../logger.model';

@Injectable()
export class HttpLoggerService implements HttpLogger {
  constructor(
    @Inject(HTTP_LOGGER_TOKEN) private readonly httpConfig: HttpConfigModel
  ) {}

  sendLog(loggerModel: AbstractLoggerModel): HttpRequest<AbstractLoggerModel> {
    const { params, headers } = this.httpConfig;
    return new HttpRequest('POST', `${this.httpConfig.endpoint}`, loggerModel, {
      responseType: this.httpConfig.responseType || 'json',
      withCredentials: this.httpConfig.credentials || false,
      ...params,
      ...headers,
    });
  }
}
