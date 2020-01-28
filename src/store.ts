import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/rootSaga';

// Redux の createStore() を実行するときのふたつ目の引数に、 applyMiddleware() に Saga のミドルウェアを渡したものを設定すると、Saga ミドルウェアが有効になる。
// 複数のミドルウェアを組み込むことももちろん可能。

// ここら辺はお約束として覚える
const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

// ここでさっき定義したルートタスクを渡してミドルウェアの run() を実行することで Saga の監視スレッドが起動する。
sagaMiddleWare.run(rootSaga);

export default store;
