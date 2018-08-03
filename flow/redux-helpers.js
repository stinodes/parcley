type RP = {
  dispatch: Dispatch<*>,
};
declare type ReduxProps<OwnProps, MappedProps> = OwnProps & MappedProps & RP;

declare type Action<ActionType, Payload> = {
  +type: ActionType,
  +payload: Payload,
  +error?: boolean,
  +meta?: mixed,
};
