import { AxiosError } from 'axios';

import { User } from '../services/github/models';
import * as ActionType from './githubConstants';

interface GetMembersParams {
  companyName: string;
}
interface GetMembersResult {
  users: User[];
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

// type は型や型の組み合わせに別名を付けることができる
// | で連結させるのは共用体型といわれ、いずれかに該当する型として扱うことができる。
export type GithubAction =
  | ReturnType<typeof getMembers.start>
  | ReturnType<typeof getMembers.succeed>
  | ReturnType<typeof getMembers.fail>;
