import { InjectionToken } from '@angular/core';
import { Log2SrvConfig } from '../log2srv.config';

export const CONFIGURATION_TOKEN: InjectionToken<Log2SrvConfig> = new InjectionToken<Log2SrvConfig>(
  'The configuration provided by the client'
);
