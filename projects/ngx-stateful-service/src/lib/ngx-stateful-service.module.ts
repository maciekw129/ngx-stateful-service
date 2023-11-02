import { NgModule } from '@angular/core';
import {StatefulServiceConfig} from "./ngx-stateful-service.model";
import {INITIAL_STATE} from "./ngx-stateful-service.tokens";
import {NgxStatefulService} from "./ngx-stateful.service";

@NgModule()
export class NgxStatefulServiceModule {
  static withConfig(config: StatefulServiceConfig) {
    return {
      ngModule: NgxStatefulServiceModule,
      providers: [
        NgxStatefulService<typeof config.initialState>,
        {
          provide: INITIAL_STATE,
          useValue: config.initialState
        }
      ]
    }
  }
}
