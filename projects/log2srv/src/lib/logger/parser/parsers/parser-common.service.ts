import { DatePipe } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  ClientModel,
  EventModel,
  LoggerModel,
  LoggerTypesNames,
} from '../../logger.model';

import { UUID_TOKEN } from '../../../initializer';
import { LOCATION_TOKEN, NAVIGATOR_TOKEN } from '../../../initializer/tokens';
import { CONFIGURATION_TOKEN } from '../../../config/config.token';

import { Log2SrvConfig } from '../../../log2srv.config';

import { ParserModel, ParserModelProvider } from './parser.model';
import { PARSERS_TOKEN } from './parser.token';

/** @dynamic */
@Injectable()
export class ParserCommonService {
  private currentUUID = '';

  constructor(
    @Inject(NAVIGATOR_TOKEN) private readonly navigator: Navigator,
    @Inject(LOCATION_TOKEN) private readonly location: Location,
    @Inject(CONFIGURATION_TOKEN) private readonly config: Log2SrvConfig,
    @Inject(UUID_TOKEN) private readonly uuid: BehaviorSubject<string>,
    @Inject(PARSERS_TOKEN) private readonly parsers: ParserModelProvider[],
    private readonly datePipe: DatePipe
  ) {
    this.uuid.subscribe((muuid: string) => (this.currentUUID = muuid));
  }

  getEventParser(
    parserType: LoggerTypesNames,
    defaultEvent: 'event' | 'http' | 'descriptor'
  ): ParserModel {
    const parser = this.parsers.find((provider) => provider[parserType]);
    if (parser) {
      return parser[parserType]! as ParserModel;
    } else {
      return this.parsers.find((provider) => provider[defaultEvent])![
        defaultEvent
      ]! as ParserModel;
    }
  }

  getDefaultModel(eventModel: EventModel): LoggerModel {
    return {
      uuid: this.currentUUID,
      timestamp: this.datePipe.transform(Date.now(), this.config.timestamp)!,
      client: this.getClient(),
      location: this.location.href.toString(),
      event: eventModel,
    };
  }

  private getClient(): ClientModel {
    return {
      code: this.navigator.appCodeName,
      agent: this.navigator.userAgent,
      platform: this.navigator.platform,
      java: this.navigator.javaEnabled(),
      plugins: new Array(this.navigator.plugins.length)
        .fill('')
        .map((_, i) => this.navigator.plugins.item(i)!.name),
      langs: Object.assign([], this.navigator.languages),
    };
  }
}
