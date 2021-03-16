import { Injectable } from '@angular/core';

import { LoggerModel } from '../../../logger.model';
import { ParserModel } from '../parser.model';

@Injectable()
export class DescriptorDefaultParser extends ParserModel<LoggerModel> {
  parse(
    loggerModel: LoggerModel,
    descriptorEvent: { descriptor: string; args: string }
  ): LoggerModel {
    return {
      ...loggerModel,
      message: `${descriptorEvent.descriptor} (${descriptorEvent.args})`,
    };
  }
}
