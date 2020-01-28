import React, { FC } from 'react';
import { connect } from 'react-redux';

import MessageList, { WebSocketProps } from '../../components/websocket/MessageList';
import store from '../../store';

// Container Component でやりたいこと
// 1. ここでやりたいことは参照したい Store State の値をコンポーネントの Props にマッピングすること
// 2. 発行したい Action を生成する Action Creator 関数をコンポーネントの Props にマッピングすること

interface StateProps {
  messages: string[];
}

type EnhancedWebSocketProps = StateProps & WebSocketProps;

// 合成後の型を取るためにこうしている
type AllState = ReturnType<typeof store.getState>;

// Store の State を Props にマッピングする
// const mapStateToProps = (state: WebSocketState): StateProps => ({
//   messages: state.messages,
// });

const mapStateToProps = (state: AllState): StateProps => {
  // 今、 Store を分割したのでこのような State になっている。
  // { gitHub: { users: [], repositories: [], isLoading}, webSocket: { messages: [] } }

  return {
    messages: state.webSocket.messages,
  };
};

// それぞれ受け取って渡すだけ。
// Container Component が実際に Action を発行したり Store にアクセスしてる
const MessageListContainer: FC<EnhancedWebSocketProps> = ({ messages }) => {
  return <MessageList messages={messages} />;
};

export default connect(mapStateToProps)(MessageListContainer);
