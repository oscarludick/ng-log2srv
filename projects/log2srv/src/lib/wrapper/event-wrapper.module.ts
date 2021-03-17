import { APP_BOOTSTRAP_LISTENER, ComponentRef, NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';

import { ReplaceRootService } from './replace-root.service';
import { EventWrapperComponent } from './event-wrapper.component';
import { EventWrapperDirective } from './event-wrapper.directive';

import { CONFIGURATION_TOKEN } from '../config';
import { Log2SrvConfig } from '../log2srv.config';

export function appReplaceFactory(
  replaceRoot: ReplaceRootService,
  config: Log2SrvConfig
): (component: ComponentRef<any>) => void {
  const lambda = (component: ComponentRef<any>) => {
    if (config.root) {
      if (config.root === component.componentType) {
        replaceRoot.replaceAppRoot(component);
      } else {
        console.warn(
          `The provided ${config.root.name} is not a root component.`
        );
      }
    }
    return;
  };
  return lambda;
}

@NgModule({
  declarations: [EventWrapperDirective, EventWrapperComponent],
  exports: [EventWrapperDirective, EventWrapperComponent],
})
export class EventWrapperModule {
  static forRoot(): ModuleWithProviders<EventWrapperModule> {
    return {
      ngModule: EventWrapperModule,
      providers: [
        ReplaceRootService,
        {
          provide: APP_BOOTSTRAP_LISTENER,
          useFactory: appReplaceFactory,
          deps: [ReplaceRootService, CONFIGURATION_TOKEN],
          multi: true,
        },
      ],
    };
  }
}
