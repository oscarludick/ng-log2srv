import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ConsoleMessage } from './console-logger.model';

import { UUID_TOKEN } from '../../initializer';
import { CONFIGURATION_TOKEN } from '../../config';
import { Log2SrvConfig } from '../../log2srv.config';
import {
  DOCUMENT_TOKEN,
  LOCATION_TOKEN,
  NAVIGATOR_TOKEN,
} from '../../initializer/tokens';

/** @dynamic */
@Injectable()
export class ConsoleLogger {
  private readonly colorSupport: boolean = false;
  private currentUUID: string = '';

  constructor(
    @Inject(DOCUMENT_TOKEN) private readonly document: Document,
    @Inject(LOCATION_TOKEN) private readonly location: Location,
    @Inject(NAVIGATOR_TOKEN) private readonly navigator: Navigator,
    @Inject(UUID_TOKEN) private readonly uuid: BehaviorSubject<string>,
    @Inject(CONFIGURATION_TOKEN) private readonly config: Log2SrvConfig,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly datePipe: DatePipe
  ) {
    this.uuid.subscribe((_uuid: string) => (this.currentUUID = _uuid));
    this.colorSupport = this.isIE();
  }

  print(logMessage: ConsoleMessage): void {
    logMessage = {
      ...logMessage,
      color: logMessage.color || 'lightseagreen',
      meta: logMessage.meta || this.getMetaString(),
    };

    if (!this.colorSupport) {
      this.printModernBrowser(logMessage);
    } else {
      this.printOldBrowser(logMessage);
    }
  }

  private getMetaString(): string {
    const timestamp = this.datePipe.transform(
      new Date(),
      this.config.timestamp
    )!;
    return `[${timestamp}]`;
  }

  private isIE(): boolean {
    return (
      isPlatformBrowser(this.platformId) &&
      !!(
        this.navigator?.userAgent?.indexOf('MSIE') !== -1 ||
        this.navigator?.userAgent?.match(/Trident\//) ||
        this.navigator?.userAgent?.match(/Edge\//)
      )
    );
  }

  private printModernBrowser(logMessage: ConsoleMessage): void {
    console.info(
      `%c${logMessage.meta} \u27F6`,
      `color:${logMessage.color}; font-weight: bold`,
      `${this.document.title.toUpperCase()} ${this.location.pathname} (${
        this.location.host
      }) ${logMessage.message} (${this.currentUUID}) \u2938`,
      logMessage.data
    );
  }

  private printOldBrowser(logMessage: ConsoleMessage): void {
    console.info(
      `%c[${logMessage.meta}]`,
      `UUID: ${logMessage.message}`,
      logMessage.data
    );
  }
}
