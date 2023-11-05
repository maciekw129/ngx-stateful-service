import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {INITIAL_STATE} from "./ngx-stateful-service.tokens";
import {InitialState} from "./ngx-stateful-service.model";

@Injectable()
export class StatefulService<T extends InitialState> {
  protected _state$: BehaviorSubject<T> = new BehaviorSubject<T>(<T>inject(INITIAL_STATE, {optional: true}) ?? this.throwEmptyInitialStateError());

  public getWholeStateValue(): T {
    return this._state$.value;
  }

  public getWholeState$(): Observable<T> {
    return this._state$.asObservable();
  }

  public getStateSliceValue<K extends keyof T>(key: K): T[K] {
    return this._state$.value[key];
  }

  public getStateSlice$<K extends keyof T>(key: K): Observable<T[K]> {
    return this.getWholeState$().pipe(map((state: T) => state[key]));
  }

  public patchState(stateSlice: Partial<T>) {
    this._state$.next({
      ...this._state$.value,
      ...stateSlice,
    });
  }

  private throwEmptyInitialStateError(): void {
    throw new Error('stateful service: You must declare initial state before injecting service.')
  }
}
