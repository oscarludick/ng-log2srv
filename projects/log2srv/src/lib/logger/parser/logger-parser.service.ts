import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CommonModel, LoggerModel } from '../logger.model';
import { LoggerParser } from './logger-parser';

import {
  EventParserService,
  HttpEventParserService,
  DescriptorEventParserService,
} from './parsers';

@Injectable()
export class LoggerParserService implements LoggerParser<LoggerModel> {
  constructor(
    private readonly eventParser: EventParserService,
    private readonly httpEventParser: HttpEventParserService,
    private readonly descriptorEventParser: DescriptorEventParserService
  ) {}

  parseEvent(event: CommonModel): LoggerModel {
    if (event.domEvent) {
      return this.eventParser.parseEvent(event.domEvent) as LoggerModel;
    } else if (event.httpEvent) {
      return this.httpEventParser.parseHttpEvent(
        event.httpEvent.event,
        event.httpEvent.url,
        event.httpEvent.method,
        event.httpEvent.latency
      ) as LoggerModel;
    } else {
      return this.descriptorEventParser.parseDescriptorEvent(
        event.descriptorEvent!.event,
        event.descriptorEvent!.location,
        event.descriptorEvent!.method,
        event.descriptorEvent!.args,
        event.descriptorEvent!.value
      ) as LoggerModel;
    }
  }
}
