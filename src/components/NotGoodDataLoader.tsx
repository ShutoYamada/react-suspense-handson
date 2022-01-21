import { useState } from "react";
import fetchData1 from "../utils/fetchData1";

/** あまり良くないが成功するDataLoader(setState + loading版) */
const NotGoodDataLoader: React.VFC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  // ローディングフラグが立っていてdataがまだ無ければローディングを開始する
  if (loading && data === null) {
    throw fetchData1().then(setData);
  }

  /**
   * 動作はするが、以下の2つの観点から非推奨
   *
   * 1.データをロードするコンポーネントであるにも関わらず初回にSuspendしないのはおかしい
   * Suspenseの利点は「コンポーネントの描画=データの表示(フェッチ)に成功している」という責務の単純化にある
   *
   * 2.実質Suspend Cancelとなっている
   * Promiseの解決より早く、setDataによるrenderを行なってSuspenseをキャンセルしている状態である
   * 最悪、永遠に解決されないPromiseを投げつつそれとは別に1秒後にsetDataを呼び出してもいいことになる
   */

  // データがあればそれを表示
  return (
    <div>
      <div>Data is {data}</div>
      <button className="border p-1" onClick={() => setLoading(true)}>
        load
      </button>
    </div>
  );
};
export default NotGoodDataLoader;
