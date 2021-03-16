import { InjectionToken } from '@angular/core';

export const DOCUMENT_TOKEN = new InjectionToken<Document>('The document');

export const NAVIGATOR_TOKEN = new InjectionToken<Navigator>('The navigator');

export const LOCATION_TOKEN = new InjectionToken<Location>('The location');
