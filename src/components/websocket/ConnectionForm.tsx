import React, { FC, FormEvent } from 'react';
import { Button, Input } from 'semantic-ui-react';

import './ConnectionForm.css';

export interface ConnectWebSocketParams {
  url: string;
}

export interface ConnectionFormProps {
  handleChange?: (targetName: string, newValue: string) => void;
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  values?: ConnectWebSocketParams;
  isConnected?: boolean;
}

const ConnectionForm: FC<ConnectionFormProps> = ({
  handleChange = () => {},
  handleSubmit = () => {},
  values = { url: '' },
  isConnected = false,
}) => (
  <>
    <form className="connection-form" onSubmit={handleSubmit}>
      <Input
        placeholder="WebSocket URL を入力..."
        type="text"
        name="q"
        onChange={(event, data) => handleChange('url', String(data.value))}
        value={values.url}
      />

      {!isConnected && (
        <Button type="submit" disabled={!values.url.length} primary data-test="exec-search">
          接続
        </Button>
      )}

      {isConnected && (
        <Button type="submit" disabled color="green" data-test="exec-search">
          接続中
        </Button>
      )}
    </form>
  </>
);

export default ConnectionForm;
