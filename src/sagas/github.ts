import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import * as Action from '../actions/githubConstants';
import { getMembers, searchRepositories } from '../actions/github';
import * as api from '../services/github/api';

// ジェネレータと Effect と呼ばれる Saga 特有の DSL っぽい API を使った書き方。
// 各タスクが async/await ではなくジェネレータを使って書くようになっているのは react-saga 開発チームの信条

// ジェネレータとは、値を保持しつつ繰り返し処理や逐次処理を行うための手段として JavaScript が提供しているもの。
// function* という宣言文と、 yield という返却後部運を用いる。

// DSL を呼び出す際には yield 文の中で呼び出す。

// タスク関数には引数として Action が渡されてくる。その型は ReturnType で Action Creator の戻り値からの型推論で設定しておこう。
// そうすることで Payload の中身から companyName が抽出できる。
function* runGetMembers(action: ReturnType<typeof getMembers.start>) {
  const { companyName } = action.payload;

  try {
    // call は外部の非同期処理関数をコールする。
    // 第二引数以降は、第一引数に渡した関数に渡される引数になる
    const users = yield call(api.getMembersFactory(), companyName);

    // API リクエストが成功したら、最後に Action Creator 関数 getMembers.succeed() に必要なデータを引き渡して実行、 Action を dispatch して完了
    // put は ActionCreator を実行して Action を dispatch する。
    yield put(getMembers.succeed({ companyName }, { users }));
  } catch (error) {
    yield put(getMembers.fail({ companyName }, error));
  }
}

export function* watchGetMembers() {
  // Action.GET_MEMBERS_START という Action Type の Action を Dispatcher から渡されてこないか監視する。
  // お目当ての Action を受け取ったら runGetMembers を実行する。

  // take は特定の Action を待ち受ける
  yield takeLatest(Action.GET_MEMBERS_START, runGetMembers);
}

function* runSearchRepositories(action: ReturnType<typeof searchRepositories.start>) {
  const { q, sort } = action.payload;

  try {
    const handler = api.searchRepositoriesFactory();
    // call は外部の非同期処理関数をコールする。
    // 第二引数以降は、第一引数に渡した関数に渡される引数になる
    const repositories = yield call(handler, q, sort);

    // API リクエストが成功したら、最後に Action Creator 関数 getMembers.succeed() に必要なデータを引き渡して実行、 Action を dispatch して完了
    // put は ActionCreator を実行して Action を dispatch する。
    yield put(searchRepositories.succeed(action.payload, { repositories }));
  } catch (error) {
    yield put(searchRepositories.fail(action.payload, error));
  }
}

export function* watchSearchRepositories() {
  yield takeLatest(Action.SEARCH_REPOSITORIES_START, runSearchRepositories);
}

// rootSaga は最上位のタスクとなるもので、これを Saga ミドルウェアに渡すとアプリ起動時に同時に起動される。
export default function* rootSaga() {
  // ここで fork された分だけ別のタスクも立ち上がってスタンバイする。
  // ここで起動されるのは watchGetMembers ひとつだが、これが Action.GET_MEMBERS_START という Action Type の
  // Action を Dispatcher から渡されてこないか監視し続けることになる。

  // fork は自身とは別のスレッドを起動し、そこで特定のタスクを実行する。 Task オブジェクトを返す。
  yield all([fork(watchGetMembers), fork(watchSearchRepositories)]);
}
