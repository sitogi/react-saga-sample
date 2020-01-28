import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

import './index.css';
import './styles/semantic.min.css';

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
