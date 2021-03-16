import { InjectionToken } from '@angular/core';

import { ParserModelProvider } from './parser.model';

export const PARSERS_TOKEN: InjectionToken<ParserModelProvider> = new InjectionToken<
  ParserModelProvider[]
>('Event and http parsers');
