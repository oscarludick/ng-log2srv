import { Provider } from '@angular/core';

import { provideLogger } from '../logger';
import { provideInitializer } from '../initializer';
import { provideHttpLoggerInterceptor } from '../interceptor';

import { provideConfiguration } from './config.provider';
import { Log2SrvConfig } from '../log2srv.config';

export function provideStartup(config: Log2SrvConfig): Provider[] {
  const providers: Provider[] = [];
  providers.push(provideInitializer());
  providers.push(provideHttpLoggerInterceptor());
  providers.push(provideConfiguration(config));
  providers.push(provideLogger(config));
  return providers;
}
