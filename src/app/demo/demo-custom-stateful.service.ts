import { Injectable } from '@angular/core';
import { CustomStatefulService } from 'ngx-stateful-service';
import { DemoState } from './demo.model';

@Injectable({ providedIn: 'root' })
export class DemoCustomStatefulService extends CustomStatefulService<DemoState> {
  constructor() {
    super({
      todos: ['Vacuum the apartment'],
    });
  }
}
