import { Directive, HostListener, Inject } from '@angular/core';

import {
  LoggerWrapperService,
  AbstractLoggerModel,
  LoggerTypesNames,
} from '../logger';
import { LoggerParser } from '../logger/parser';

import { CONFIGURATION_TOKEN } from '../config';
import { Log2SrvConfig, LoggerConfig } from '../log2srv.config';

@Directive({ selector: 'log2srv' })
export class EventWrapperDirective {
  constructor(
    @Inject(CONFIGURATION_TOKEN) private readonly config: Log2SrvConfig,
    private readonly parser: LoggerParser<AbstractLoggerModel>,
    private readonly logger: LoggerWrapperService
  ) {}

  @HostListener('click', ['$event'])
  @HostListener('contextmenu', ['$event'])
  @HostListener('dblclick', ['$event'])
  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  @HostListener('beforeunload', ['$event'])
  @HostListener('copy', ['$event'])
  @HostListener('cut', ['$event'])
  @HostListener('paste', ['$event'])
  @HostListener('error', ['$event'])
  @HostListener('fullscreenchange', ['$event'])
  @HostListener('fullscreenerror', ['$event'])
  @HostListener('input', ['$event'])
  @HostListener('keydown', ['$event'])
  @HostListener('keypress', ['$event'])
  @HostListener('keyup', ['$event'])
  @HostListener('pagehide', ['$event'])
  @HostListener('pageshow', ['$event'])
  @HostListener('popstate', ['$event'])
  @HostListener('resize', ['$event'])
  @HostListener('reset', ['$event'])
  @HostListener('scroll', ['$event'])
  @HostListener('submit', ['$event'])
  @HostListener('select', ['$event'])
  @HostListener('storage', ['$event'])
  @HostListener('unload', ['$event'])
  onEventListener($event: Event): void {
    const type = $event.type as LoggerTypesNames;
    if (this.config.events![type]?.enabled) {
      const model = this.parser.parseEvent({ domEvent: $event });
      this.logger.sendLog(model, this.getLogging(type));
    }
  }

  private getLogging(key: LoggerTypesNames): LoggerConfig | undefined {
    return {
      console: this.config.events![key]!.console,
      server: this.config.events![key]!.server,
    };
  }
}
