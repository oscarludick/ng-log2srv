import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { LoggerWrapperService } from '../logger/logger-wrapper.service';
import { LoggerModel, AbstractLoggerModel } from '../logger/logger.model';
import { LoggerParser } from '../logger/parser';

import { Log2SrvConfig } from '../log2srv.config';
import { CONFIGURATION_TOKEN } from '../config';

@Injectable()
export class HttpLoggerInterceptor implements HttpInterceptor {
  constructor(
    @Inject(CONFIGURATION_TOKEN) private readonly config: Log2SrvConfig,
    private readonly parser: LoggerParser<AbstractLoggerModel>,
    private readonly logger: LoggerWrapperService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    let response: HttpResponse<any> | undefined;
    let error: HttpErrorResponse | undefined;

    this.sendLog(req, req.urlWithParams, req.method, 0);
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) =>
          (response = event instanceof HttpResponse ? event : undefined),
        (httpError: HttpErrorResponse) => (error = httpError)
      ),
      finalize(() => {
        const elapsed = Date.now() - started;
        if (response) {
          this.sendLog(response, req.urlWithParams, req.method, elapsed);
        } else if (error) {
          this.sendLog(error, req.urlWithParams, req.method, elapsed);
        }
      })
    );
  }

  private sendLog(
    event: HttpRequest<any> | HttpResponse<any> | HttpErrorResponse,
    url: string,
    method: string,
    latency: number
  ): void {
    const logger: LoggerModel = this.parser.parseEvent({
      httpEvent: {
        event,
        url,
        method,
        latency,
      },
    }) as LoggerModel;

    const type = this.getTypeEvent(event);
    if (this.config.events![type]?.enabled) {
      this.logger.sendLog(logger);
    }
  }

  /**
   * Used to validate the event type, in case of the client changes the parser
   * @param event the http event
   */
  private getTypeEvent(
    event: HttpRequest<any> | HttpResponse<any> | HttpErrorResponse
  ): 'request' | 'response' | 'error' {
    if (event instanceof HttpRequest) {
      return 'request';
    } else if (event instanceof HttpResponse) {
      return 'response';
    } else {
      return 'error';
    }
  }
}
