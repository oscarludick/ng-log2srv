import { InjectionToken } from '@angular/core';

import { HttpConfigModel } from './http-logger.model';

export const HTTP_LOGGER_TOKEN: InjectionToken<HttpConfigModel> = new InjectionToken<HttpConfigModel>(
  'The http config for logging to server'
);
