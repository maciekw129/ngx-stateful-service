export interface StatefulServiceConfig<T extends InitialState> {
  initialState: T
}

export type InitialState = Record<string, any>;
