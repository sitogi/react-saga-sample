import * as ActionType from './actionTypeConstants';

export const websocketActions = {
  createConnection: (url: string) => ({
    type: ActionType.CREATE_CONNECTION,
    payload: url,
  }),

  subscribeMessage: (msg: string) => ({
    type: ActionType.SUBSCRIBE_MESSAGE,
    payload: msg,
  }),

  publishMessage: (message: string) => ({
    type: ActionType.PUBLISH_MESSAGE,
    payload: message,
  }),
};

export type WebSocketAction = ReturnType<typeof websocketActions.subscribeMessage>;
