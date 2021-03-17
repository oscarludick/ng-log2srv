import { Provider } from '@angular/core';

import { Log2SrvConfig, LoggerConfig } from '../log2srv.config';

import { CONFIGURATION_TOKEN } from './config.token';
import { LoggerTypesNames } from '../logger';
import { ParserModel } from '../logger/parser/parsers/parser.model';

export function provideConfiguration(config: Log2SrvConfig): Provider {
  return {
    provide: CONFIGURATION_TOKEN,
    useValue: getConfig(config),
  };
}

function getConfig(config: Log2SrvConfig): Log2SrvConfig {
  config = Object.assign({
    ...config,
    timestamp: config.timestamp || 'dd-MM-yyyy HH:mm:ss',
    loggerConfig: {
      ...getDefaultLogging(
        config.loggerConfig ? config.loggerConfig!.console : undefined,
        config.loggerConfig ? config.loggerConfig!.server! : undefined,
        config.http?.endpoint
      ),
    },
  });

  if (config.events) {
    Object.keys(config.events).forEach((key: string) => {
      const type = key as LoggerTypesNames;
      config.events![type] = {
        ...config.events![type]!,
        ...getDefaultLogging(
          config.events![type]!.console,
          config.events![type]!.server,
          config.http?.endpoint
        ),
      };

      if (config.events![type]?.parser) {
        const customParser = new config.events![type]!.parser!();
        if (!(customParser instanceof ParserModel)) {
          console.warn(
            `Parser provided for event ${type} is not an instance of ParserModel.\n `,
            config.events![type]?.parser
          );
          config.events![type]!.parser = undefined;
        }
      }
    });
  }

  return config;
}

export function getDefaultLogging(
  console: boolean | undefined,
  server: boolean | undefined,
  endpoint: string | undefined
): LoggerConfig {
  return {
    console: console !== undefined ? console : true,
    server: endpoint ? (server !== undefined ? server : true) : false,
  };
}
