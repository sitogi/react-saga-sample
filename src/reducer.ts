import { Reducer } from 'redux';
import { AxiosError } from 'axios';

import { GithubAction } from './actions/github';
import * as ActionType from './actions/githubConstants';
import { User } from './services/github/models';

export interface GithubState {
  users: User[];
  isLoading: boolean;
  error?: AxiosError | null;
}

export const initialState: GithubState = {
  users: [],
  isLoading: false,
};

// `(prevState, action) => newState` の純粋関数で表現される Reducer
// 以前の State と Action を引数に取り、新しい State を返す gethubReducer
// reducer でやってはいけないこと
// 1. 引数の state と action インスタンスの値を変更する
// 2. 副作用をおこす (API 呼び出しやルーティングを変えるなどなど)
// 3. 実行ごとにランダムになる処理を使う (Date.now() や Math.random() を使う)
const githubReducer: Reducer<GithubState, GithubAction> = (
  state: GithubState = initialState,
  action: GithubAction,
): GithubState => {
  // ActionType で場合分け
  switch (action.type) {
    case ActionType.GET_MEMBERS_START:
      return {
        // ...foo はスプレッド演算子といい、中身の要素を展開することができる
        // 一度前の状態を展開することで、差分のみを更新できるようにしている
        ...state,
        users: [], // 空のユーザ
        isLoading: true, // ローディング true
      };
    case ActionType.GET_MEMBERS_SUCCEED:
      return {
        ...state,
        users: action.payload.result.users, // 成功アクションの payload に入っている users を返す
        isLoading: false, // ローディングは false
      };
    case ActionType.GET_MEMBERS_FAIL:
      return {
        ...state, // uses は必須だが、ここでスプレッドしているのでそれが使われている
        isLoading: false, // ローディングは false
        error: action.payload.error, // 失敗アクションの payload に入っている axion のエラーを返す
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;

      return state;
    }
  }
};

export default githubReducer;
