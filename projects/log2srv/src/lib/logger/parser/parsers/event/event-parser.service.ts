import { Injectable } from '@angular/core';

import {
  EventModel,
  AbstractLoggerModel,
  LoggerTypesNames,
} from '../../../logger.model';

import { ParserCommonService } from '../parser-common.service';

@Injectable()
export class EventParserService {
  constructor(private readonly parserCommon: ParserCommonService) {}

  parseEvent(event: Event): AbstractLoggerModel {
    const loggerModel = this.parserCommon.getDefaultModel(this.getEvent(event));
    return this.parserCommon
      .getEventParser(event.type as LoggerTypesNames, 'event')
      .parse(loggerModel, event);
  }

  private getEvent(event: Event): EventModel {
    return {
      type:
        event instanceof KeyboardEvent
          ? 'KeyboardEvent'
          : event instanceof MouseEvent
          ? 'MouseEvent'
          : event instanceof ClipboardEvent
          ? 'ClipboardEvent'
          : 'Event',
      name: event.type as LoggerTypesNames,
    };
  }
}
