import { Descriptors } from './descriptor.model';

import { CONFIGURATION_TOKEN } from '../config';
import { Log2SrvModule } from '../log2srv.module';

import { LoggerModel, LoggerWrapperService } from '../logger';
import { LoggerParser } from '../logger/parser';

export function Log2Srv(): ClassDecorator {
  function sendLog(
    event: 'invocation' | 'execution',
    location?: string,
    method?: string,
    args?: string,
    value?: string
  ): void {
    const parser = Log2SrvModule.mInjector!.get(LoggerParser);
    const logger = Log2SrvModule.mInjector!.get(LoggerWrapperService);
    const config = Log2SrvModule.mInjector!.get(CONFIGURATION_TOKEN);

    const loggerModel: LoggerModel = parser.parseEvent({
      descriptorEvent: {
        event,
        location,
        method,
        args,
        value,
      },
    }) as LoggerModel;
    if (config.events![event]?.enabled) {
      logger.sendLog(loggerModel, {
        console: config.events![event]?.console,
        server: config.events![event]?.server,
      });
    }
  }

  return (constructor: any) => {
    const name = constructor.name;

    function _getCallback_(
      mdescriptors: Descriptors,
      mdescriptor: string
    ): any {
      return mdescriptors[mdescriptor].value;
    }

    function _getDescriptors_(): Descriptors {
      return Object.getOwnPropertyDescriptors(constructor.prototype);
    }

    const descriptors = _getDescriptors_();

    for (const hook in descriptors) {
      if (descriptors.hasOwnProperty(hook)) {
        const original = _getCallback_(descriptors, hook);
        constructor.prototype[hook] = function(...args: any[]): any {
          sendLog('invocation', name, hook, args.join(';'), '');
          const result = original.apply(this, args);
          sendLog('execution', name, hook, '', result || 'void');
          return result;
        };
      }
    }
  };
}
