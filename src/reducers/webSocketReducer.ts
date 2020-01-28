import { Reducer } from 'redux';

import { WebSocketAction } from '../actions/websocket';
import * as ActionType from '../actions/actionTypeConstants';

export interface WebSocketState {
  isConnected: boolean;
  messages: string[];
}

export const initialState: WebSocketState = {
  isConnected: false,
  messages: [],
};

const webSocketReducer: Reducer<WebSocketState, WebSocketAction> = (
  state: WebSocketState = initialState,
  action: WebSocketAction,
): WebSocketState => {
  // 配列を更新する際は slice を使い別配列として上書きする必要がある
  const tmp: string[] = state.messages.slice();

  // ActionType で場合分け
  switch (action.type) {
    case ActionType.ADD_MESSAGE:
      tmp.push(action.payload);

      return {
        ...state,
        messages: tmp,
      };
    default: {
      return { ...state };
    }
  }
};

export default webSocketReducer;
