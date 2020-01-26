import * as Model from '../services/websocket/models';
import * as ActionType from './actionTypeConstants';

interface WebSocketResult {
  response: Model.WebSocketResponse;
}

export const websocketActions = {
  connect: (params: WebSocketResult) => ({
    type: ActionType.WEBSOCKET_CONNECT as typeof ActionType.WEBSOCKET_CONNECT,
    payload: params.response,
  }),
};

export type WebSocketAction = ReturnType<typeof websocketActions.connect>;
