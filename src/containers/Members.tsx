import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';

import Members, { MembersProps } from '../components/Members';
import { User } from '../services/github/models';
import { GithubState } from '../reducer';
import { getMembers } from '../actions/github';

interface StateProps {
  users: User[];
  isLoading?: boolean;
}

interface DispatchProps {
  getMembersStart: (companyName: string) => void;
}

// withRouter と connect という二つの HOC を利用するために Props を合成している
type EnhancedMembersProps = MembersProps &
  StateProps &
  DispatchProps &
  RouteComponentProps<{ companyName: string }>;

// 参照したい Store State の値をコンポーネントの Props にマッピングする
const mapStateToProps = (state: GithubState): StateProps => ({
  users: state.users,
  isLoading: state.isLoading,
});

// 発行したい Action を生成する Action Creator 関数を Props にマッピングする
// Props 関数名と Action Creator の関数名がそれぞれ同じになるように定義してあるのでプロパティ名をショートハンドで省略できる。
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getMembersStart: (companyName: string) =>
        getMembers.start({ companyName }),
    },
    dispatch,
  );

const MembersContainer: FC<EnhancedMembersProps> = ({
  users,
  isLoading,
  getMembersStart,
  match,
}) => {
  const { companyName } = match.params;

  useEffect(() => {
    getMembersStart(companyName);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Members companyName={companyName} users={users} isLoading={isLoading} />
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MembersContainer),
);
