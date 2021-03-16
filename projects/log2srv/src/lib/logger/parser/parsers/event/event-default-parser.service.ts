import { Injectable } from '@angular/core';

import { LoggerModel } from '../../../logger.model';
import { ParserModel } from '../parser.model';

@Injectable()
export class EventDefaultParserService extends ParserModel<LoggerModel> {
  parse(loggerModel: LoggerModel, event: Event): LoggerModel {
    return {
      ...loggerModel,
      dom: {
        lifetime: event.timeStamp,
        target:
          (event.composedPath()[0] as HTMLElement).outerHTML.split('>')[0] +
          '>',
      },
      message: `Event called: ${event.type}`,
    };
  }
}
