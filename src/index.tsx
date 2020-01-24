import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';

import App from './App';
// Default Export しているときは波かっこがいらない。
import { githubReducer } from './reducer';
import rootSaga from './sagas/github';
import * as serviceWorker from './serviceWorker';

import './index.css';
import './styles/semantic.min.css';

// ここら辺はお約束として覚える
const sagaMiddleWare = createSagaMiddleware();
// Redux の createStore() を実行するときのふたつ目の引数に、 applyMiddleware() に Saga のミドルウェアを渡したものを設定すると、Saga ミドルウェアが有効になる。
// 複数のミドルウェアを組み込むことももちろん可能。
const store = createStore(githubReducer, applyMiddleware(sagaMiddleWare));

// 生成された store を DOM ルートの <Provider> に Props として渡してあげると、 Saga ミドルウェアが有効になった Redux の機能が使えるようになる。
// 基本すべてのページを動的に生成するため、エントリポイントは以下のようにかなりシンプルになる。
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

serviceWorker.unregister();
// ここでさっき定義したルートタスクを渡してミドルウェアの run() を実行することで Saga の監視スレッドが起動する。
sagaMiddleWare.run(rootSaga);
