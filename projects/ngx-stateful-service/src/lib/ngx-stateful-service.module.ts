import {ModuleWithProviders, NgModule} from '@angular/core';
import {InitialState, StatefulServiceConfig} from "./ngx-stateful-service.model";
import {INITIAL_STATE} from "./ngx-stateful-service.tokens";
import {NgxStatefulService} from "./ngx-stateful.service";

@NgModule()
export class NgxStatefulServiceModule {
  static withConfig<T extends InitialState>(config: StatefulServiceConfig<T>): ModuleWithProviders<NgxStatefulServiceModule> {
    return {
      ngModule: NgxStatefulServiceModule,
      providers: [
        NgxStatefulService,
        {
          provide: INITIAL_STATE,
          useValue: config.initialState
        }
      ]
    }
  }
}
