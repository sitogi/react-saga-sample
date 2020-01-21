import React, { FC } from 'react';
import { connect } from 'react-redux';

import RepositoriesSearch, { RepositoryListProps } from '../../components/repositories/List';
import { Repository } from '../../services/github/models';
import { GithubState } from '../../reducer';

// 検索結果のリポジトリとロード中かどうかの boolean を持つ
interface StateProps {
  repositories: Repository[];
  isLoading: boolean;
}

type EnhancedRepositoryListProps = RepositoryListProps & StateProps;

// Store の State を Props にマッピングする
const mapStateToProps = (state: GithubState): StateProps => ({
  repositories: state.repositories,
  isLoading: state.isLoading,
});

// それぞれ受け取って渡すだけ。
const RepositoryListContainer: FC<EnhancedRepositoryListProps> = ({ repositories, isLoading }) => (
  <RepositoriesSearch repositories={repositories} isLoading={isLoading} />
);

export default connect(mapStateToProps)(RepositoryListContainer);
