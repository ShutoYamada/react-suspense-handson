import { Suspense, useState } from "react";
import "./App.css";
import LoadableDataLoader from "./components/LoadableDataLoader";
// import FailedDataLoader from "./components/FailedDataLoader";
// import NotGoodDataLoader from "./components/NotGoodDataLoader";
// import AlwaysSuspend from "./components/AlwaysSuspend";
// import { SometimesSuspend } from "./components/SometimeSuspend";
import RenderingNotifier from "./components/RenderingNotifier";
import {
  SimilarQueryHookDataLoader1,
  SimilarQueryHookDataLoader2,
} from "./components/SimilarQueryHookDataLoader";
import Loadable from "./types/Loadable";
import fetchData1 from "./utils/fetchData1";
import fetchData2 from "./utils/fetchData2";

const App = () => {
  // 再描画用のカウンタ
  // Suspense配下のcountを参照しているコンポーネントが再描画されることで
  // 他のコンポーネントも巻き込まれて再Suspendする
  const [count, setCount] = useState(0);

  // 自作のLoadableクラスを用いたState
  const [data1] = useState(() => new Loadable(fetchData2()));
  const [data2] = useState(() => new Loadable(fetchData2()));
  const [data3] = useState(() => new Loadable(fetchData2()));

  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <RenderingNotifier name="outside-Suspense" />
      <Suspense fallback={<p>Loading...</p>}>
        <RenderingNotifier name="inside-Suspense" />
        <p>
          Suspenseの配下は全てサスペンドに巻き込まれるため、これは描画されない
        </p>
        {/* <AlwaysSuspend /> */}
        {/* <SometimesSuspend /> */}
        {/* <FailedDataLoader /> */}
        {/* <NotGoodDataLoader /> */}
        <button className="border p-1" onClick={() => setCount((c) => c + 1)}>
          {count}
        </button>
        <SimilarQueryHookDataLoader1 />
        <SimilarQueryHookDataLoader2 />
      </Suspense>
      <p>↓↓↓↓↓↓↓Loadableクラスを使ったバージョンのDataLoader↓↓↓↓↓↓↓</p>
      <Suspense fallback={<p>Loading...</p>}>
        <LoadableDataLoader data={data1} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <LoadableDataLoader data={data2} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <LoadableDataLoader data={data3} />
      </Suspense>
    </div>
  );
};

export default App;
