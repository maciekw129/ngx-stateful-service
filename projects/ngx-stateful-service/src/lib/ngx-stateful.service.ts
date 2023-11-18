import { Injectable } from '@angular/core';
import { InitialState } from './ngx-stateful-service.model';
import { CustomStatefulService } from './ngx-custom-stateful-service';

@Injectable()
export class StatefulService<
  T extends InitialState
> extends CustomStatefulService<T> {
  constructor() {
    super();
  }
}
