import React, { FC, FormEvent, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ConnectionForm, { ConnectWebSocketParams } from '../../components/websocket/ConnectionForm';
import { websocketActions } from '../../actions/websocket';
import store from '../../store';

type AllState = ReturnType<typeof store.getState>;

interface StateProps {
  isConnected?: boolean;
}

const mapStateToProps = (state: AllState): StateProps => ({
  isConnected: state.webSocket.isConnected,
});

// FC 内で参照するための Dispatch 関数を保持した Props 。
// あくまでも関数コンポーネントは渡ってきた Props しか意識しないので、 Dispatch も 関数として定義しておく
interface DispatchProps {
  createConnection: (url: string) => void;
}

// FC 内で参照する Props と、実際に実行する Dispatcher をマッピングするための関数
// この関数を定義しておき、 Redux に渡してあげることであとはよしなにやってくれるようになる。
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  createConnection: url => dispatch(websocketActions.createConnection(url)),
});

type EnhancedWSProps = ConnectWebSocketParams & StateProps & DispatchProps;

const ConnectionFormContainer: FC<EnhancedWSProps> = ({ isConnected, createConnection }) => {
  const [params, setValues] = useState<ConnectWebSocketParams>({
    url: '',
  });

  const handleChange = (targetName: string, newValue: string, event?: SyntheticEvent) => {
    if (event) {
      event.persist();
    }

    setValues(prevValues => ({ ...prevValues, [targetName]: newValue }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
      createConnection(params.url);
    }
  };

  return (
    <ConnectionForm handleChange={handleChange} handleSubmit={handleSubmit} values={params} isConnected={isConnected} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionFormContainer);
