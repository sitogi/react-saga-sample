import React, { FC, FormEvent } from 'react';
import { Button, Input, Message } from 'semantic-ui-react';

import './MessageForm.css';

export interface MessageFormProps {
  handleChange?: (newValue: string) => void;
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  message: string;
  isConnected: boolean;
  connectFailed: boolean;
}

const MessageForm: FC<MessageFormProps> = ({
  handleChange = () => {},
  handleSubmit = () => {},
  message = '',
  isConnected = false,
  connectFailed = false,
}) => {
  if (!isConnected) {
    if (connectFailed) {
      return (
        <>
          <Message negative>
            <Message.Header>接続に失敗しました。</Message.Header>
          </Message>
        </>
      );
    }

    return (
      <>
        <div />
      </>
    );
  }

  return (
    <>
      <form className="message-form" onSubmit={handleSubmit}>
        <Input
          placeholder=""
          type="text"
          name="message"
          onChange={(event, data) => handleChange(String(data.value))}
          value={message}
        />

        <Button type="submit" disabled={!message.length} primary data-test="exec-search">
          送信
        </Button>
      </form>
    </>
  );
};

export default MessageForm;
