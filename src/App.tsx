import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router';

import Home from './components/Home';
import Companies from './components/companies'; // index.tsx が自動で読まれているっぽい
import RepoSearch from './components/repositories/Search';
import MessageList from './containers/websocket/MessageList';
import CompanyMembers from './containers/companies/Members';

import './App.css';
import pages from './pages';

const title = 'GitHub API デモアプリ';

// HTML ヘッダと Route の定義をしている。初期表示では Home コンポーネントが表示される。
const App: FC = () => (
  <>
    <Helmet htmlAttributes={{ lang: 'ja' }}>
      <title>{title}</title>
    </Helmet>

    <header className="App-header">
      <h1>{title}</h1>
    </header>
    <Switch>
      <Route path={pages.index.path} exact component={Home} />
      <Route path={pages.companies.index.path} component={Companies} />
      <Route path={pages.companies.members.path} component={CompanyMembers} />
      <Route path={pages.repositories.search.path} component={RepoSearch} />
      <Route path={pages.websocket.path} component={MessageList} />
      <Redirect to="/" />
    </Switch>
  </>
);

export default App;
