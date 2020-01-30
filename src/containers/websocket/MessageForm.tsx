import React, { FC, FormEvent, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import MessageForm from '../../components/websocket/MessageForm';
import { websocketActions } from '../../actions/websocket';
import store from '../../store';

type AllState = ReturnType<typeof store.getState>;

interface StateProps {
  isConnected: boolean;
}

const mapStateToProps = (state: AllState): StateProps => ({
  isConnected: state.webSocket.isConnected,
});

interface DispatchProps {
  publishMessage: (message: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  publishMessage: message => dispatch(websocketActions.publishMessage(message)),
});

type EnhancedWSProps = { message: string; isConnected: boolean } & StateProps & DispatchProps;

const MessageFormContainer: FC<EnhancedWSProps> = ({ publishMessage: sendMessage, isConnected }) => {
  const [msg, setValues] = useState('');

  const handleChange = (newValue: string, event?: SyntheticEvent) => {
    if (event) {
      event.persist();
    }

    setValues(newValue);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
      sendMessage(msg);
      setValues('');
    }
  };

  return (
    <MessageForm handleChange={handleChange} handleSubmit={handleSubmit} message={msg} isConnected={isConnected} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageFormContainer);