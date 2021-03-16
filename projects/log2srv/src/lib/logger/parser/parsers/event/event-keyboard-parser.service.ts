import { Injectable } from '@angular/core';

import { LoggerModel } from '../../../logger.model';
import { ParserModel } from '../parser.model';

@Injectable()
export class EventKeyboardParserService extends ParserModel<LoggerModel> {
  parse(loggerModel: LoggerModel, event: KeyboardEvent): LoggerModel {
    return {
      ...loggerModel,
      dom: {
        lifetime: event.timeStamp,
        target: `${
          (event.composedPath()[0] as HTMLElement).outerHTML.split('>')[0] + '>'
        }`,
        description: `CodeKey: ${event.code}`,
      },
      message: `Pressed key \"${event.key}\"`,
    };
  }
}
