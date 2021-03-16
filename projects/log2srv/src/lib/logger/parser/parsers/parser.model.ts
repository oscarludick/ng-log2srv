import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { LoggerTypesNames, AbstractLoggerModel } from '../../logger.model';

export type ParserModelProvider = {
  [K in LoggerTypesNames | 'event' | 'http' | 'descriptor']: ParserModel;
};

export abstract class ParserModel<
  T extends AbstractLoggerModel = AbstractLoggerModel
> {
  abstract parse(
    loggerModel: T,
    event:
      | Event
      | HttpRequest<any>
      | HttpResponse<any>
      | HttpErrorResponse
      | { descriptor: string, args: any }
  ): T;
}
