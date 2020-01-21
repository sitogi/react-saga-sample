import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from 'semantic-ui-react';
import RepositoryForm from '../../containers/repositories/Form';
import RepositoryList from '../../containers/repositories/List';
import pages from '../../pages';

import './Search.css';

// リポジトリ検索画面の全体
// ここで呼び出している Form と List は Container Component であることに注意。
// Presentational から Container を呼び出す場合はこのような形だけになるのかも。
const RepositorySearch: FC = () => (
  <>
    <Helmet>
      <title>{pages.repositories.search.title}</title>
    </Helmet>
    <div className="repositories">
      <Header as="h2">{pages.repositories.search.title}</Header>
      <RepositoryForm />
      <RepositoryList />
    </div>
  </>
);

export default RepositorySearch;
