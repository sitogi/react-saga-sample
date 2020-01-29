import { call, put, take, takeLatest } from 'redux-saga/effects';

import { eventChannel } from 'redux-saga';
import * as Action from '../actions/actionTypeConstants';
import { WebSocketAction, websocketActions } from '../actions/websocket';

const initWebsocket = (url: string) =>
  eventChannel(emitter => {
    const socket: WebSocket = new WebSocket(url);
    socket.onopen = () => {
      socket.send('{"message":"sendmessage", "data":"Hello server from Redux-Saga"}');
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

      // 受信した内容によって分岐して、必要な Action を返せる
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

export function* wsSagas(connectionAction: ReturnType<typeof websocketActions.createConnection>) {
  const url = connectionAction.payload;

  // EventChannel を作成し、それを take で待ち受けることによって EventChannel 内のイベントを待機できる
  // eventChannel 内では、引数の emitter 関数の戻り値を return させることで、 yield take(channel) に教えることができる
  const channel = yield call(initWebsocket, url);
  while (true) {
    const action: WebSocketAction = yield take(channel);
    yield put(action);
  }
}

export function* watchConnectWebSocket() {
  yield takeLatest(Action.CREATE_CONNECTION, wsSagas);
}
