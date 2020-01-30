import * as ActionType from './actionTypeConstants';

export const websocketActions = {
  createConnection: (url: string) => ({
    type: ActionType.CREATE_CONNECTION,
    payload: url,
  }),

  connectFail: (error: Error) => ({
    type: ActionType.CONNECT_FAIL,
    payload: error,
    error: true,
  }),

  subscribeMessage: (msg: string) => ({
    type: ActionType.SUBSCRIBE_MESSAGE,
    payload: msg,
  }),

  publishMessage: (message: string) => ({
    type: ActionType.PUBLISH_MESSAGE as typeof ActionType.CONNECT_FAIL,
    payload: message,
  }),
};

export type WebSocketAction = ReturnType<typeof websocketActions.subscribeMessage>;

// export type WebSocketAction =
//   | ReturnType<typeof websocketActions.createConnection>
//   | ReturnType<typeof websocketActions.connectFail>
//   | ReturnType<typeof websocketActions.subscribeMessage>
//   | ReturnType<typeof websocketActions.publishMessage>;
