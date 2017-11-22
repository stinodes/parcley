// flow-typed signature: 460bbfa7f98b2dd4a8f3ccd7f3d90a09
// flow-typed version: 62fc0adb2a/redux-saga-thunk_v0.5.x/flow_>=v0.25.x

// @flow

import type { Middleware, Reducer } from "redux";

declare module "redux-saga-thunk" {
  declare module.exports: {
    middleware: Middleware,
    reducer: Reducer,
    isPending<State>(state: State, name?: string | string[]): boolean,
    hasFailed<State>(state: State, name?: string | string[]): boolean,
    isDone<State>(state: State, name?: string | string[]): boolean,
    isComplete<State>(state: State, name?: string | string[]): boolean
  };
}
