import React, { FC, FormEvent, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import RepositoryForm, { RepositoryFormProps, RepositoryFormValues } from '../../components/repositories/Form';
import { GithubState } from '../../reducer';
import { searchRepositories } from '../../actions/github';

// Store に保持している Props
interface StateProps {
  isLoading: boolean;
}

// Dispatch の Props
interface DispatchProps {
  searchRepositoriesStart: (params: RepositoryFormValues) => void;
}

// フォームの Props と上二つをそれぞれ合成した Props
type EnhancedRepositorySearchProps = RepositoryFormProps & StateProps & DispatchProps;

// StoreState を State Props にするマッパー
const mapStateToProps = (state: GithubState): StateProps => ({
  isLoading: state.isLoading,
});

// Dispatch を Dispatch Props にするマッパー
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      searchRepositoriesStart: params => searchRepositories.start(params),
    },
    dispatch,
  );

// Form の Function Container
// 合成した Props を受け取ってレンダリングする関数。
const RepositoryFormContainer: FC<EnhancedRepositorySearchProps> = ({ isLoading, searchRepositoriesStart }) => {
  // State Hook
  // useState は関数コンポーネント内で Local State に相当するものを使えるようにする機能。
  // 戻り値として state 変数とそのセッター関数を返す。なので分割代入で受け取っている。
  // 引数には、その state 変数の初期値を設定してあげる。
  const [values, setValues] = useState<RepositoryFormValues>({
    q: '', // query の初期値は空文字
  });

  // フォームの何かが更新された際のイベント処理
  // SyntheticEvent はイベント情報が入っているオブジェクト
  const handleChange = (targetName: string, newValue: string, event?: SyntheticEvent) => {
    if (event) {
      // 非同期処理の中でイベントのプロパティにアクセスしたい場合はこうする。
      // これにより合成イベントがイベントプールの対象から除外され、イベントへの参照をコードで保持できるようになる。
      event.persist();
    }

    // さっき useState で取得した state を更新するためのセッター
    // 受け取った targetName の値を newValue にして state を更新する
    setValues(v => ({ ...v, [targetName]: newValue }));
    // 新しい state の内容を保持しておく (一行上の state は使いまわせないのだろうか...)
    const newValues = { ...values, [targetName]: newValue };

    if (!!values.q.trim() && targetName === 'sort') {
      // 検索文字列が空じゃないかつ targetName が sort のときは検索スタート
      // ソート順が変更された場合は変更後のソートルールで取得しにいく
      searchRepositoriesStart(newValues);
    }
  };

  // フォームの Submit 時のイベント処理
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event) {
      // 該当要素のオリジナルな onClick の挙動を抑制するための記述
      // <a> タグだった場合にページ遷移させないようにする、など
      event.preventDefault();
      searchRepositoriesStart(values);
    }
  };

  // それぞれの渡してあげて、描画してもらう
  return (
    <RepositoryForm handleChange={handleChange} handleSubmit={handleSubmit} values={values} isLoading={isLoading} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryFormContainer);