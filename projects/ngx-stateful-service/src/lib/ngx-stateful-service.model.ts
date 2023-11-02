export interface StatefulServiceConfig {
  initialState: InitialState
}

export type InitialState = Record<string, any>;
