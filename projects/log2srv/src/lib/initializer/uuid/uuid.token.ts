import { InjectionToken } from '@angular/core';

export const UUID_TOKEN = new InjectionToken<string>(
  'The uuid of the current client'
);
