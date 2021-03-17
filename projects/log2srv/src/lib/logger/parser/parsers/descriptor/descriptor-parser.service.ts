import { Injectable } from '@angular/core';
import {
  AbstractLoggerModel,
  EventModel,
  LoggerTypesNames,
} from '../../../logger.model';

import { ParserCommonService } from '../parser-common.service';

@Injectable()
export class DescriptorEventParserService {
  constructor(private readonly parserCommon: ParserCommonService) {}

  parseDescriptorEvent(
    event: 'invocation' | 'execution',
    location?: string,
    method?: string,
    args?: string,
    value?: string
  ): AbstractLoggerModel {
    const loggerModel = Object.assign(
      this.parserCommon.getDefaultModel(this.getDescriptorEvent(event)),
      {
        descriptor: this.getDescriptorModel(
          event,
          location,
          method,
          args,
          value
        ),
      }
    );
    return this.parserCommon
      .getEventParser(loggerModel.event.type as LoggerTypesNames, 'descriptor')
      .parse(loggerModel, { descriptor: method!, args });
  }

  private getDescriptorEvent(event: 'invocation' | 'execution'): EventModel {
    return {
      type: 'DescriptorEvent',
      name: event,
    };
  }

  private getDescriptorModel(
    event: 'invocation' | 'execution',
    location?: string,
    method?: string,
    args?: string,
    value?: string
  ): {
    event: 'invocation' | 'execution';
    location?: string;
    method?: string;
    args?: string;
    value?: string;
  } {
    return {
      event,
      location: location || 'Not provided',
      method: method || 'Not provided',
      args: args || 'None',
      value: value || 'None',
    };
  }
}
