import { Provider } from '@angular/core';

import { SingleEventConfig } from '../../../log2srv.config';
import { DOCUMENT_TOKEN } from '../../../initializer/tokens';
import { LoggerTypesNames } from '../../logger.model';

import {
  DescriptorEventParserService,
  DescriptorDefaultParser,
} from './descriptor';

import {
  EventDefaultParserService,
  EventClipboardParserService,
  EventKeyboardParserService,
  EventMouseParserService,
  EventParserService,
} from './event';

import {
  HttpRequestParserService,
  HttpResponseParserService,
  HttpErrorParserService,
  HttpEventParserService,
  HttpDefaultParserService,
} from './http';
import { ParserCommonService } from './parser-common.service';

import { PARSERS_TOKEN } from './parser.token';

export function provideParsers(
  events: { [K in LoggerTypesNames]?: SingleEventConfig }
): Provider[] {
  return [
    Object.keys(events).map(
      (k): Provider => {
        const type = k as LoggerTypesNames;
        return events[type]!.parser
          ? {
              provide: PARSERS_TOKEN,
              useValue: { [type]: new events[type]!.parser!() },
              multi: true,
            }
          : [];
      }
    ),
    {
      provide: PARSERS_TOKEN,
      useValue: {
        descriptor: new DescriptorDefaultParser(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        http: new HttpDefaultParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        event: new EventDefaultParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        request: new HttpRequestParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        response: new HttpResponseParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        error: new HttpErrorParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useFactory: (document: Document) => {
        return {
          copy: new EventClipboardParserService(document),
        };
      },
      deps: [DOCUMENT_TOKEN],
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useFactory: (document: Document) => {
        return {
          cut: new EventClipboardParserService(document),
        };
      },
      deps: [DOCUMENT_TOKEN],
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useFactory: (document: Document) => {
        return {
          paste: new EventClipboardParserService(document),
        };
      },
      deps: [DOCUMENT_TOKEN],
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        mouseenter: new EventMouseParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        mouseleave: new EventMouseParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        click: new EventMouseParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        dblclick: new EventMouseParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        contextmenu: new EventMouseParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        keydown: new EventKeyboardParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        keyup: new EventKeyboardParserService(),
      },
      multi: true,
    },
    {
      provide: PARSERS_TOKEN,
      useValue: {
        keypress: new EventKeyboardParserService(),
      },
      multi: true,
    },
    HttpEventParserService,
    EventParserService,
    ParserCommonService,
    DescriptorEventParserService,
  ];
}
