import React, { FC } from 'react';
import { List } from 'semantic-ui-react';

export interface WebSocketProps {
  messages: string[];
}

const MessageList: FC<WebSocketProps> = ({ messages = [] }) => (
  <>
    <List divided relaxed>
      {messages.map(msg => (
        <List.Item key={msg}>
          <List.Content>
            <List.Header>{msg}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  </>
);

export default MessageList;
