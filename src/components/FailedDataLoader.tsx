import { useState } from "react";
import fetchData1 from "../utils/fetchData1";

/** うまくいかないDataLoader(setState使用版) */
const FailedDataLoader: React.VFC = () => {
  const [data, setData] = useState<string | null>(null);

  // dataがまだ無ければローディングを開始する
  if (data === null) {
    throw fetchData1().then(setData);
  }

  /**
   * 実際にSuspenseの下にこのコンポーネントを置くと以下のWarningが出る
   *
   * > Warning: Can't perform a React state update on a component that hasn't mounted yet.
   * > This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component.
   * > Move this work to useEffect instead.
   *
   * Suspendはrenderを中断している状態であり、要するに未render状態のコンポーネントの中で、
   * setStateを使用することができない(stateの記憶領域がまだ確保されていない)
   */

  // データがあればそれを表示
  return <div>Data is {data}</div>;
};

export default FailedDataLoader;
