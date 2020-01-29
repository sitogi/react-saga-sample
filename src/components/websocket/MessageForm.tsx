import React, { FC, FormEvent } from 'react';
import { Button, Input } from 'semantic-ui-react';

import './MessageForm.css';

export interface MessageFormProps {
  handleChange?: (newValue: string) => void;
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  message: string;
  isConnected: boolean;
}

const MessageForm: FC<MessageFormProps> = ({
  handleChange = () => {},
  handleSubmit = () => {},
  message = '',
  isConnected = false,
}) => (
  <>
    {!isConnected ? (
      <div />
    ) : (
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
    )}
  </>
);

export default MessageForm;
