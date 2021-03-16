import { Injectable } from '@angular/core';

import { LoggerModel } from '../../../logger.model';
import { ParserModel } from '../parser.model';

@Injectable()
export class EventMouseParserService extends ParserModel<LoggerModel> {
  parse(loggerModel: LoggerModel, event: MouseEvent): LoggerModel {
    return {
      ...loggerModel,
      dom: {
        lifetime: event.timeStamp,
        target:
          (event.composedPath()[0] as HTMLElement).outerHTML.split('>')[0] +
          '>',
        description: `${(event.target as HTMLElement).textContent}`,
      },
      message: `${event.type} on x:${event.screenX}, y:${event.screenY}`,
    };
  }
}
