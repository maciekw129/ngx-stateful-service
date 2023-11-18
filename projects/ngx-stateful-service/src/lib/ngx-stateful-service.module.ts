import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  InitialState,
  StatefulServiceConfig,
} from './ngx-stateful-service.model';
import { INITIAL_STATE } from './ngx-stateful-service.tokens';
import { StatefulService } from './ngx-stateful.service';

@NgModule()
export class StatefulServiceModule {
  static withConfig<T extends InitialState>(
    config: StatefulServiceConfig<T>
  ): ModuleWithProviders<StatefulServiceModule> {
    return {
      ngModule: StatefulServiceModule,
      providers: [
        StatefulService,
        {
          provide: INITIAL_STATE,
          useValue: config.initialState,
        },
      ],
    };
  }
}
