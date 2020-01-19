import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Members, { MembersProps } from '../../components/companies/Members';
import { User } from '../../services/github/models';
import { GithubState } from '../../reducer';
import { getMembers } from '../../actions/github';

// Store に格納する Props
interface StateProps {
  users: User[];
  isLoading?: boolean;
}

// Dispatcher に渡す Props
interface DispatchProps {
  getMembersStart: (companyName: string) => void;
}

// interface の合成。 withRouter と connect という二つの HOC を利用するために Props を合成している
type EnhancedMembersProps = MembersProps & StateProps & DispatchProps & RouteComponentProps<{ companyName: string }>;

// 参照したい Store State の値をコンポーネントの Props にマッピングする
// GithubState の state を受け取り、 StateProps にマッピングしてリターンしている。
// TypeScript で Arrow 関数の戻り値の型を定義する場合はこうする。
const mapStateToProps = (state: GithubState): StateProps => ({
  users: state.users,
  isLoading: state.isLoading,
});

// 発行したい Action を生成する Action Creator 関数を Dispatch Props にマッピングする
// DispatchProps 関数名と Action Creator の関数名がそれぞれ同じになるように定義してあるのでプロパティ名をショートハンドで省略できる。
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ getMembersStart: (companyName: string) => getMembers.start({ companyName }) }, dispatch);

// 本体
const MembersContainer: FC<EnhancedMembersProps> = ({ users, isLoading, getMembersStart, match }) => {
  // Props から match.params.code のように URL の :code の部分が文字列として抽出できる
  const { companyName } = match.params;

  // useEffect Hook
  // 第一引数に引数なしの関数を設定する。
  // 第二引数に任意の変数を入れておくと、その値が前回のレンダリング時と変わらなければ第一引数で渡された関数の中身の副作用処理実行がキャンセルされる。
  // 第一引数に渡した関数内の処理が、コンポーネントのレンダリング直前に実行される。 (ここでは getMembersStart)
  // ここでは第一引数の関数には戻り値がないが、もし戻り値で関数を返却していた場合、コンポーネントのアンマウント直前に実行される。
  useEffect(() => {
    getMembersStart(companyName);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Presentational Component の Props に Store の値を渡してあげて、それを return する。
  return <Members companyName={companyName} users={users} isLoading={isLoading} />;
};

// react-redux の connect HOC を使って、この Component, Store, Action を紐付ける。
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MembersContainer));
