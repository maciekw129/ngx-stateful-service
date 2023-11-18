import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { InitialState } from './ngx-stateful-service.model';
import { INITIAL_STATE } from './ngx-stateful-service.tokens';

@Injectable()
export abstract class CustomStatefulService<T extends InitialState> {
  protected declare _state$: BehaviorSubject<T>;
  protected declare _initialState: T;

  constructor(
    initialState: T = <T>inject(INITIAL_STATE, { optional: true } ?? null)
  ) {
    if (!Boolean(initialState)) {
      this.throwEmptyInitialStateError();
    }

    this._initialState = initialState;
    this._state$ = new BehaviorSubject(initialState);
  }

  public getWholeStateValue(): T {
    return this._state$.value;
  }

  public getWholeState$(): Observable<T> {
    return this._state$.asObservable();
  }

  public resetWholeState(): void {
    this._state$.next(this._initialState);
  }

  public getStateSliceValue<K extends keyof T>(key: K): T[K] {
    return this._state$.value[key];
  }

  public getStateSlice$<K extends keyof T>(key: K): Observable<T[K]> {
    return this.getWholeState$().pipe(map((state: T) => state[key]));
  }

  public resetStateSlice<K extends keyof T>(key: K): void {
    this._state$.next({
      ...this._state$.value,
      [key]: this._initialState[key],
    });
  }

  public patchState(stateSlice: Partial<T>) {
    this._state$.next({
      ...this._state$.value,
      ...stateSlice,
    });
  }

  private throwEmptyInitialStateError(): void {
    throw new Error(
      'stateful service: You must declare initial state in CustomStatefulService constructor or provide as INITIAL_STATE before injecting service.'
    );
  }
}
