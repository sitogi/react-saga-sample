import { call, put, take } from 'redux-saga/effects';

import { eventChannel } from 'redux-saga';
import * as Action from '../actions/actionTypeConstants';
import { WebSocketAction } from '../actions/websocket';

const initWebsocket = () =>
  eventChannel(emitter => {
    const socket: WebSocket = new WebSocket('');
    socket.onopen = () => {
      socket.send('hello server');
    };
    socket.onerror = error => {
      // nothing to do
    };
    socket.onmessage = event => {
      let data = null;
      try {
        data = event.data;
      } catch (e) {
        console.error(`Error parsing : ${event.data}`);
      }

      return emitter({ type: Action.ADD_MESSAGE, payload: data });

      // 受信した内容によって分岐して、必要な Action を返す
      // if (msg) {
      //   const { payload: book } = msg;
      //   const { channel } = msg;
      //   switch (channel) {
      //     case 'ADD_BOOK':
      //       return emitter({ type: ADD_BOOK, book });
      //     case 'REMOVE_BOOK':
      //       return emitter({ type: REMOVE_BOOK, book });
      //     default:
      //       return null;
      //   }
      // } else {
      //   return null;
      // }
    };

    // unsubscribe function
    return () => {};
  });

export function* wsSagas() {
  const channel = yield call(initWebsocket);
  while (true) {
    const action: WebSocketAction = yield take(channel);
    yield put(action);
  }
}
