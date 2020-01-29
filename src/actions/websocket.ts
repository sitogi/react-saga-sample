import * as ActionType from './actionTypeConstants';

export const websocketActions = {
  createConnection: (url: string) => ({
    type: ActionType.CREATE_CONNECTION,
    payload: url,
  }),

  addMessage: (msg: string) => ({
    type: ActionType.ADD_MESSAGE,
    payload: msg,
  }),

  sendMessage: (message: string) => ({
    type: ActionType.SEND_MESSAGE,
    payload: message,
  }),
};

export type WebSocketAction = ReturnType<typeof websocketActions.addMessage>;
