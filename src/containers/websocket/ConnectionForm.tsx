import React, { FC, FormEvent, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import ConnectionForm, { ConnectWebSocketParams } from '../../components/websocket/ConnectionForm';
import { websocketActions } from '../../actions/websocket';
import store from '../../store';

interface StateProps {
  isConnected?: boolean;
}

type AllState = ReturnType<typeof store.getState>;

interface DispatchProps {
  createConnection: (params: ConnectWebSocketParams) => void;
}

type EnhancedRepositorySearchProps = ConnectWebSocketParams & StateProps & DispatchProps;

// StoreState を State Props にするマッパー
const mapStateToProps = (state: AllState): StateProps => ({
  isConnected: state.webSocket.isConnected,
});

// Dispatch を Dispatch Props にするマッパー
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      createConnection: params => websocketActions.createConnection(params),
    },
    dispatch,
  );

const ConnectionFormContainer: FC<EnhancedRepositorySearchProps> = ({ isConnected, createConnection }) => {
  const [values, setValues] = useState<ConnectWebSocketParams>({
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
      createConnection(values);
    }
  };

  return (
    <ConnectionForm handleChange={handleChange} handleSubmit={handleSubmit} values={values} isConnected={isConnected} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionFormContainer);
