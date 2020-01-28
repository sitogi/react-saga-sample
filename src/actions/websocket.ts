import * as ActionType from './actionTypeConstants';

export const websocketActions = {
  addMessage: (msg: string) => ({
    type: ActionType.ADD_MESSAGE as typeof ActionType.ADD_MESSAGE,
    payload: msg,
  }),
};

export type WebSocketAction = ReturnType<typeof websocketActions.addMessage>;
