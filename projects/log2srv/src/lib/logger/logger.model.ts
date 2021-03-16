import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

export type LoggerTypes =
  | 'ClipboardEvent'
  | 'MouseEvent'
  | 'KeyboardEvent'
  | 'Event'
  | 'HttpEvent'
  | 'DescriptorEvent';

export type LoggerTypesNames =
  | 'invocation'
  | 'execution'
  | 'error'
  | 'request'
  | 'response'
  | 'click'
  | 'contextmenu'
  | 'dblclick'
  | 'mouseenter'
  | 'mouseleave'
  | 'beforeunload'
  | 'copy'
  | 'cut'
  | 'paste'
  | 'error'
  | 'fullscreenchange'
  | 'fullscreenerror'
  | 'input'
  | 'keydown'
  | 'keypress'
  | 'keyup'
  | 'pagehide'
  | 'pageshow'
  | 'popstate'
  | 'resize'
  | 'reset'
  | 'scroll'
  | 'submit'
  | 'select'
  | 'storage'
  | 'unload';

export interface HttpModel {
  url: string;
  method: string;
  latency: number;
  headers?: string;
  status?: string;
}

export interface DescriptorModel {
  location: string;
  method: string;
  args: string;
  value: string;
  state: 'invocation' | 'execution';
}

export interface DomModel {
  lifetime: number;
  target: string;
  description?: string;
}

export interface EventModel {
  type: LoggerTypes;
  name: LoggerTypesNames;
}

export interface CommonModel {
  httpEvent?: {
    event: HttpRequest<any> | HttpResponse<any> | HttpErrorResponse;
    url: string;
    method: string;
    latency: number;
  };
  domEvent?: Event;
  descriptorEvent?: {
    event: 'invocation' | 'execution';
    location?: string;
    method?: string;
    args?: string;
    value?: string;
  };
}

export interface ClientModel {
  code: string;
  agent: string;
  platform: string;
  java: boolean;
  plugins: Array<string>;
  langs: Array<string>;
}

export interface LoggerModel extends AbstractLoggerModel {
  http?: HttpModel;
  dom?: DomModel;
  descriptor?: DescriptorModel;
  message?: string;
}

export interface AbstractLoggerModel {
  uuid?: string;
  timestamp?: string;
  client?: ClientModel;
  location?: string;
  event: EventModel;
}
