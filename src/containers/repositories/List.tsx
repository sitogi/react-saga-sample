import React, { FC } from 'react';
import { connect } from 'react-redux';

import RepositoriesSearch, { RepositoryListProps } from '../../components/repositories/List';
import { Repository } from '../../services/github/models';
import store from '../../store';

// 検索結果のリポジトリとロード中かどうかの boolean を持つ
interface StateProps {
  repositories: Repository[];
  isLoading: boolean;
}

type AllState = ReturnType<typeof store.getState>;

type EnhancedRepositoryListProps = RepositoryListProps & StateProps;

// Store の State を Props にマッピングする
const mapStateToProps = (state: AllState): StateProps => ({
  repositories: state.gitHub.repositories,
  isLoading: state.gitHub.isLoading,
});

// それぞれ受け取って渡すだけ。
const RepositoryListContainer: FC<EnhancedRepositoryListProps> = ({ repositories, isLoading }) => (
  <RepositoriesSearch repositories={repositories} isLoading={isLoading} />
);

export default connect(mapStateToProps)(RepositoryListContainer);
