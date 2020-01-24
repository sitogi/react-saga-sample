import React, { FC } from 'react';
import { connect } from 'react-redux';

import WebSocketSample from '../../components/websocket/WebSocketSample';
import { WebSocketState } from '../../reducer';

// Container Component でやりたいこと
// 1. ここでやりたいことは参照したい Store State の値をコンポーネントの Props にマッピングすること
// 2. 発行したい Action を生成する Action Creator 関数をコンポーネントの Props にマッピングすること

interface StateProps {
  inputTexts: string[];
}

type EnhancedWebSocketProps = StateProps;

// Store の State を Props にマッピングする
const mapStateToProps = (state: WebSocketState): StateProps => ({
  inputTexts: state.response.inputTexts,
});

// それぞれ受け取って渡すだけ。
// Container Component が実際に Action を発行したり Store にアクセスしてる
const WebSocketSampleContainer: FC<EnhancedWebSocketProps> = ({ inputTexts }) => (
  <WebSocketSample inputTexts={inputTexts} />
);

export default connect(mapStateToProps)(WebSocketSampleContainer);
