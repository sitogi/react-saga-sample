import axios from 'axios';

import { User } from './models';

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: 'https://api.github.com',
  timeout: 7000,
};

// getMembers 関数を返すファクトリ (クロージャ)
export const getMembersFactory = (optionConfig?: ApiConfig) => {
  // スプレッド構文によって未指定プロパティはデフォルト値を使用する
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
  };
  // axios の初期化。ミニマムだと Base URL と timeout だけで作れるみたい
  const instance = axios.create(config);

  // async - await
  const getMembers = async (organizationName: string) => {
    // GET リクエスト実行と結果取得まで待つ
    const response = await instance.get(`/orgs/${organizationName}/members`);

    if (response.status !== 200) {
      throw new Error('Server Error');
    }
    // response.data という形で取得する。 members の型は User の配列
    const members: User[] = response.data;

    return members;
  };

  // クロージャに関して。
  // 関数 getMembersFactory が最後に関数 getMembers を返しているから、
  // この getMembersFactory の戻り値を代入した変数の中身は内部の関数 getMembers なのよ。
  // だからそれを実行すると getMembersFactory の内部の getMembers が実行される。
  // getMembers が単体で呼ばれるわけではなく、あくまで getMembersFactory の環境の中で実行されているから
  // 変数 instance の値が毎回リセットされることなく蓄積されていくわけ。
  return getMembers;
};
