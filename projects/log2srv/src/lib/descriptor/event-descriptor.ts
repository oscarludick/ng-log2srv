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
  ) {
    const parser = Log2SrvModule.mInjector!.get(LoggerParser);
    const logger = Log2SrvModule.mInjector!.get(LoggerWrapperService);
    const config = Log2SrvModule.mInjector!.get(CONFIGURATION_TOKEN);

    let loggerModel: LoggerModel = parser.parseEvent({
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

  return function (constructor: any) {
    const name = constructor.name;

    function _getCallback_(descriptors: Descriptors, descriptor: string) {
      return descriptors[descriptor].value;
    }

    function _getDescriptors_(): Descriptors {
      return Object.getOwnPropertyDescriptors(constructor.prototype);
    }

    const descriptors = _getDescriptors_();

    for (let hook in descriptors) {
      let original = _getCallback_(descriptors, hook);
      constructor.prototype[hook] = function (...args: any[]) {
        sendLog('invocation', name, hook, args.join(';'), '');
        const result = original.apply(this, args);
        sendLog('execution', name, hook, '', result || 'void');
        return result;
      };
    }
  };
}
