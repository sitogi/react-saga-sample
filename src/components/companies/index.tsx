import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import capitalize from 'lodash/capitalize';
import { List } from 'semantic-ui-react';

import './index.css';

const companies = ['facebook', 'airbnb', 'netflix'];

// companies は固定値としているため props は存在しない。
// <Link> を使ってその会社のメンバー一覧ページへのリンクを作成している。
// App.tsx の `<Route path={pages.companies.members.path} component={CompanyMembers} />` で示しているリンク
// このリンク先の CompanyMembers は presental ではなく contaner である点に注意。
const Companies: FC = () => (
  <>
    <List celled relaxed>
      {companies.map(companyName => (
        <List.Item className="list-item" key={companyName}>
          <List.Icon name="users" size="large" verticalAlign="middle" />
          <List.Content>
            <Link to={`/${companyName}/members`}>{capitalize(companyName)}のメンバー</Link>
          </List.Content>
        </List.Item>
      ))}
    </List>
  </>
);

export default Companies;
