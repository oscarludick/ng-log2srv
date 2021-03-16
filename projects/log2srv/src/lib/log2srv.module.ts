import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EventWrapperModule } from './wrapper';

import { Log2SrvConfig } from './log2srv.config';

import { provideStartup } from './config/startup-config.provider';

@NgModule({
  imports: [HttpClientModule, EventWrapperModule.forRoot()],
})
export class Log2SrvModule {
  static mInjector: Injector | undefined = undefined;

  constructor(injector: Injector) {
    Log2SrvModule.mInjector = injector;
  }

  static forRoot(
    config: Log2SrvConfig = {}
  ): ModuleWithProviders<Log2SrvModule> {
    return {
      ngModule: Log2SrvModule,
      providers: provideStartup(config),
    };
  }
}
