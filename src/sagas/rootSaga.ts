import { all, fork } from 'redux-saga/effects';

import { watchGetMembers, watchSearchRepositories } from './gitHubSaga';
import { wsSagas } from './webSocketSaga';

// rootSaga は最上位のタスクとなるもので、これを Saga ミドルウェアに渡すとアプリ起動時に同時に起動される。
export default function* rootSaga() {
  // ここで fork された分だけ別のタスクも立ち上がってスタンバイする。
  // ここで起動されるのは watchGetMembers ひとつだが、これが Action.GET_MEMBERS_START という Action Type の
  // Action を Dispatcher から渡されてこないか監視し続けることになる。

  // fork は自身とは別のスレッドを起動し、そこで特定のタスクを実行する。 Task オブジェクトを返す。
  yield all([fork(watchGetMembers), fork(watchSearchRepositories), fork(wsSagas)]);
}
