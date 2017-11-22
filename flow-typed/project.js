// @flow

// Redux connect injected
type RP = {
  dispatch: Dispatch<*>,
}
declare type ReduxProps<OwnProps, MappedProps> = OwnProps & MappedProps & RP

type ThunkMeta = { +thunk: true }

declare type Action<ActionType, Payload> = {
  +type: ActionType,
  +payload: Payload | Error,
  +error?: boolean,
  +meta?: mixed,
}

//   |{|
//   +type: Type,
//   +meta?: Meta|ThunkMeta,
//   +payload?: ?Payload,
//   +error?: false,
// |}
//   |{|
//   +type: Type,
//   +meta?: Meta|ThunkMeta,
//   +payload: Error,
//   +error: true,
// |}