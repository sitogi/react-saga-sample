import React, { FC, FormEvent } from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';

import { SearchRepositoriesParams } from '../../actions/github';

import './Form.css';

export type RepositoryFormValues = SearchRepositoriesParams;

// このコンポーネントの Prop
// 変更時の処理を持つ handleChange, サブミット時の処理を持つ handleSubmit
// Form に入力済みの値 values
// ロード中かどうかの isLoading
export interface RepositoryFormProps {
  handleChange?: (targetName: string, newValue: string) => void;
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  values?: RepositoryFormValues;
  isLoading?: boolean;
}

const sortOptions = [
  {
    key: 'match',
    text: 'マッチ度',
    value: '',
  },
  {
    key: 'stars',
    text: 'スター数',
    value: 'stars',
  },
  {
    key: 'forks',
    text: 'フォーク数',
    value: 'forks',
  },
  {
    key: 'updated',
    text: '更新日',
    value: 'updated',
  },
];

// 本体。各種イベントも外から注入するんだね。
// 各種変更イベントも外からもらったやつを埋め込んでる。各要素で同じ関数を使えるように、第一引数は target にしてるんだね。
// ボタンの disabled はここで分岐書いて処理しちゃってる
// フォームを横並びにしてるのは誰がやってるんだろう。うーんわからん！！！！
const RepositoryForm: FC<RepositoryFormProps> = ({
  handleChange = () => {},
  handleSubmit = () => {},
  values = { q: '', sort: undefined },
  isLoading = false,
}) => (
  <>
    <form className="repository-form" onSubmit={handleSubmit}>
      <Dropdown
        name="sort"
        onChange={(event, data) => handleChange('sort', String(data.value))}
        value={values.sort}
        options={sortOptions}
        placeholder="並び順"
        selection
      />
      <Input
        placeholder="リポジトリ名を入力..."
        type="text"
        name="q"
        onChange={(event, data) => handleChange('q', String(data.value))}
        value={values.q}
      />
      <Button type="submit" disabled={!values.q.length || isLoading} primary data-test="exec-search">
        検索
      </Button>
    </form>
  </>
);

export default RepositoryForm;
