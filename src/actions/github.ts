import { AxiosError } from 'axios';

import * as Model from '../services/github/models';
import * as ActionType from './githubConstants';

interface GetMembersParams {
  companyName: string;
}
interface GetMembersResult {
  users: Model.User[];
}

// Saga で非同期処理を扱うために、 getMembers という一つの仕事について
// 開始、成功、失敗の三つの状態をもった Action を返す、それぞれの ActionCreator 関数を定義
// 実際にコールするときは getMembers.start() のようにかく
export const getMembers = {
  // GetMembersParams を受け取り、GET_MEMBERS_START というアクションタイプとそのまま引数を payload として返す Action
  start: (params: GetMembersParams) => ({
    type: ActionType.GET_MEMBERS_START as typeof ActionType.GET_MEMBERS_START,
    payload: params,
  }),

  // GetMembersParams とその処理結果を受け取り、GET_MEMBERS_SUCCESS というアクションタイプとそのまま引数を payload として返す Action
  succeed: (params: GetMembersParams, result: GetMembersResult) => ({
    type: ActionType.GET_MEMBERS_SUCCEED as typeof ActionType.GET_MEMBERS_SUCCEED,
    payload: { params, result },
  }),

  // GetMembersParams とエラーを受け取り、GET_MEMBERS_ERROR というアクションタイプとそのまま引数を payload, error true を返す Action
  fail: (params: GetMembersParams, error: AxiosError) => ({
    type: ActionType.GET_MEMBERS_FAIL as typeof ActionType.GET_MEMBERS_FAIL,
    payload: { params, error },
    error: true,
  }),
};

export interface SearchRepositoriesParams {
  q: string;
  sort?: 'stars' | 'forks' | 'updated' | '';
}

interface SearchRepositoriesResult {
  repositories: Model.Repository[];
}

// アクションを返す関数をそれぞれ start, succeed, fail という名前をつけて保持したオブジェクト
// このような形にしているのは saga に渡すため。
export const searchRepositories = {
  start: (params: SearchRepositoriesParams) => ({
    // これが action 。ただの JS オブジェクト
    type: ActionType.SEARCH_REPOSITORIES_START as typeof ActionType.SEARCH_REPOSITORIES_START,
    // payload は主に正常時には Action の実行に必要なデータ、異常時にはエラー情報を格納する
    // 英単語の意味はデータ転送における正味のデータ部分 (= row data?)
    payload: params,
  }),

  succeed: (params: SearchRepositoriesParams, result: SearchRepositoriesResult) => ({
    type: ActionType.SEARCH_REPOSITORIES_SUCCEED as typeof ActionType.SEARCH_REPOSITORIES_SUCCEED,
    payload: { params, result },
  }),

  fail: (params: SearchRepositoriesParams, error: AxiosError) => ({
    type: ActionType.SEARCH_REPOSITORIES_FAIL as typeof ActionType.SEARCH_REPOSITORIES_FAIL,
    payload: { params, error },
    error: true,
  }),
};

// type は型や型の組み合わせに別名を付けることができる
// | で連結させるのは共用体型といわれ、いずれかに該当する型として扱うことができる。
export type GithubAction =
  | ReturnType<typeof getMembers.start>
  | ReturnType<typeof getMembers.succeed>
  | ReturnType<typeof getMembers.fail>
  | ReturnType<typeof searchRepositories.start>
  | ReturnType<typeof searchRepositories.succeed>
  | ReturnType<typeof searchRepositories.fail>;
