import { call, put, take, takeLatest, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as Action from '../actions/actionTypeConstants';
import { WebSocketAction, websocketActions } from '../actions/websocket';

const subscribe = (socket: WebSocket) =>
  eventChannel(emitter => {
    socket.addEventListener('open', () => {
      socket.send('{"message":"sendmessage", "data":"Hello server from Redux-Saga"}');
    });
    socket.addEventListener('error', () => {
      // nothing to do
    });
    socket.addEventListener('message', event => {
      const { data } = event;

      return emitter({ type: Action.SUBSCRIBE_MESSAGE, payload: data });

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
    });

    // unsubscribe function
    return () => {};
  });

function* subscribeSaga(socket: WebSocket) {
  // EventChannel を作成し、それを take で待ち受けることによって EventChannel 内のイベントを待機できる
  // eventChannel 内では、引数の emitter 関数の戻り値を return させることで、 yield take(channel) に教えることができる
  const channel = yield call(subscribe, socket);
  while (true) {
    const action: WebSocketAction = yield take(channel);
    yield put(action);
  }
}

function* publishSaga(socket: WebSocket) {
  while (true) {
    const action = yield take(Action.PUBLISH_MESSAGE);
    socket.send(`{"message":"sendmessage", "data":"${action.payload}"}`);
  }
}

export function* wsSagas(connectionAction: ReturnType<typeof websocketActions.createConnection>) {
  const url = connectionAction.payload;

  try {
    const socket: WebSocket = new WebSocket(url);
    yield fork(subscribeSaga, socket);
    yield fork(publishSaga, socket);
  } catch (error) {
    yield put(websocketActions.connectFail(error));
  }
}

export function* watchConnectWebSocket() {
  yield takeLatest(Action.CREATE_CONNECTION, wsSagas);
}
