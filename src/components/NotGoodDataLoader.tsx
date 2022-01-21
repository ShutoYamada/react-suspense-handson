import { useMemo, useState } from "react";
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

  // 使用しないuseMemo
  const _ = useMemo(() => {
    // この場合、"loading is true"は2回表示される
    // ボタンを押してloadingがtrueになった段階で1回
    // さらにコンポーネントがSuspendされ、記憶領域がロールバックされ
    // 再度描画された時にuseMemoが改めて評価される
    // Suspendに絡める場合、useMemoやuseCallbackの第二引数の値が変わっていなくても
    // 評価が発生してしまう(=初回評価扱い)ので注意が必要である
    if (loading) {
      console.log("loading is true");
    }
    return 1;
  }, [loading]);

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
