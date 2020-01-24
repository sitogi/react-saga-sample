import React, { FC } from 'react';
import { List } from 'semantic-ui-react';

export interface WebSocketProps {
  inputTexts: string[];
}

const Home: FC<WebSocketProps> = ({ inputTexts = [] }) => (
  <>
    <List divided relaxed>
      {inputTexts.map(text => (
        <List.Item key={text}>
          <List.Content>
            <List.Header>{text}</List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  </>
);

export default Home;
