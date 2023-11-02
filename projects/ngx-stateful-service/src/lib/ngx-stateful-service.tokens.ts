import {InjectionToken} from "@angular/core";
import {InitialState} from "./ngx-stateful-service.model";

export const INITIAL_STATE = new InjectionToken<InitialState>('INITIAL_STATE')
