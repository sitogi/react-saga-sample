import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import capitalize from 'lodash/capitalize';
import { List } from 'semantic-ui-react';

import './Home.css';

const companies = ['facebook', 'airbnb', 'netflix'];

const Home: FC = () => (
  <>
    <List celled relaxed>
      {companies.map(companyName => (
        <List.Item className="list-item" key={companyName}>
          <List.Icon name="users" size="large" verticalAlign="middle" />
          <List.Content>
            {/* それぞれにリンクを持たせる */}
            <Link to={`/${companyName}/members`}>
              {/* 先頭大文字にする */}
              {capitalize(companyName)}のメンバー
            </Link>
          </List.Content>
        </List.Item>
      ))}
    </List>
  </>
);

export default Home;
