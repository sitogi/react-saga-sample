import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from 'semantic-ui-react';
// import ConnectionForm from './ConnectionForm';
import ConnectionForm from '../../containers/websocket/ConnectionForm';
import MessageList from './MessageList';
import pages from '../../pages';

import './WebSocket.css';

// リポジトリ検索画面の全体
// ここで呼び出している Form と List は Container Component であることに注意。
// Presentational から Container を呼び出す場合はこのような形だけになるのかも。
const RepositorySearch: FC = () => (
  <>
    <Helmet>
      <title>{pages.websocket.title}</title>
    </Helmet>
    <div className="websocket">
      <Header as="h2">{pages.websocket.title}</Header>
      <ConnectionForm url="" />
      <MessageList />
    </div>
  </>
);

export default RepositorySearch;
