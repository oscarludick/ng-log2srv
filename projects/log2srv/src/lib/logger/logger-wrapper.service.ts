import { HttpBackend, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { HttpLogger, cloneHttpHeaders, cloneHttpParams } from './http';
import { AbstractLoggerModel } from './logger.model';
import { ConsoleLogger } from './console';

import { CONFIGURATION_TOKEN } from '../config';
import { Log2SrvConfig, LoggerConfig } from '../log2srv.config';

@Injectable()
export class LoggerWrapperService {
  constructor(
    private readonly httpBackend: HttpBackend,
    private readonly httpLogger: HttpLogger,
    private readonly consoleLogger: ConsoleLogger,
    @Inject(CONFIGURATION_TOKEN) private readonly config: Log2SrvConfig
  ) {}

  sendLog(
    loggerModel: AbstractLoggerModel,
    logging: LoggerConfig = {
      console: true,
      server: this.config.loggerConfig?.server,
    }
  ): void {
    if (this.validateEvent(loggerModel)) {
      this.printToConsole(logging.console!, loggerModel);
      this.sendToServer(logging.server!, loggerModel);
    }
  }

  private validateEvent(loggerModel: AbstractLoggerModel): boolean {
    if (!loggerModel.event) {
      this.consoleLogger.print({
        color: 'salmon',
        message: `AbstractLogger must have at least the event object(EventModel)`,
        data: loggerModel,
      });
      return false;
    }
    return true;
  }

  private printToConsole(
    isConsole: boolean,
    loggerModel: AbstractLoggerModel
  ): void {
    if (this.config.loggerConfig?.console && isConsole) {
      this.consoleLogger.print({
        message: `${loggerModel.event.type} ${loggerModel.event.name}`,
        data: loggerModel,
      });
    }
  }

  private sendToServer(
    isServer: boolean,
    loggerModel: AbstractLoggerModel
  ): void {
    if (
      this.config.http?.endpoint &&
      this.config.loggerConfig?.server &&
      isServer
    ) {
      let request = this.httpLogger.sendLog(loggerModel);
      if (request instanceof HttpRequest) {
        const headers = cloneHttpHeaders(request.headers);
        const params = cloneHttpParams(request.params);
        request = request.clone({ headers, params });
        this.executeRequest(request);
      } else {
        this.consoleLogger.print({
          color: 'salmon',
          message: `HttpRequest must be an instance`,
          data: request,
        });
      }
    }
  }

  private executeRequest(request: HttpRequest<AbstractLoggerModel>): void {
    this.httpBackend
      .handle(request)
      .toPromise()
      .then()
      .catch((reason: any) => {
        this.consoleLogger.print({
          color: 'salmon',
          message: `HttpClientError ${reason.statusText}`,
          data: reason,
        });
      });
  }
}
