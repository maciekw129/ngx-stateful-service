import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {INITIAL_STATE} from "./ngx-stateful-service.tokens";
import {InitialState} from "./ngx-stateful-service.model";

@Injectable({providedIn: 'root'})
export class NgxStatefulService<T extends InitialState> {
  protected _state$$: BehaviorSubject<T> = new BehaviorSubject<T>(<T>inject(INITIAL_STATE));

  public getWholeState(): Observable<T> {
    return this._state$$.asObservable();
  }

  public patchState(stateSlice: Partial<T>) {
    this._state$$.next({
      ...this._state$$.value,
      ...stateSlice,
    });
  }

  public getStateSlice<K extends keyof T>(key: K): Observable<T[K]> {
    return this.getWholeState().pipe(map((state: T) => state[key]));
  }
}
