import { Inject, Injectable } from '@angular/core';
import { DOCUMENT_TOKEN } from '../../../../initializer/tokens';

import { LoggerModel } from '../../../logger.model';
import { ParserModel } from '../parser.model';

/** @dynamic */
@Injectable()
export class EventClipboardParserService extends ParserModel<LoggerModel> {
  constructor(private readonly document: Document) {
    super();
  }

  parse(loggerModel: LoggerModel, event: ClipboardEvent): LoggerModel {
    return {
      ...loggerModel,
      dom: {
        lifetime: event.timeStamp,
        target:
          (event.composedPath()[0] as HTMLElement).outerHTML.split('>')[0] +
          '>',
        description: `Full text: ${(event.composedPath()[0] as HTMLElement).textContent?.toString()}`,
      },
      message: `${event.type.charAt(0).toUpperCase()}${event.type.substring(
        1
      )} text: \"${this.document.getSelection()}\"`,
    };
  }
}
