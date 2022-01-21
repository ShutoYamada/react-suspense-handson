import { startTransition, Suspense, useState, useTransition } from "react";
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
  SimilarQueryHookDataLoaderCustom,
  SimilarQueryHookDataLoaderWithLoadable,
} from "./components/SimilarQueryHookDataLoader";
import Loadable from "./types/Loadable";
import fetchData1 from "./utils/fetchData1";
import fetchData2 from "./utils/fetchData2";
import useTime from "./utils/useTime";

const App = () => {
  // 再描画用のカウンタ
  // Suspense配下のcountを参照しているコンポーネントが再描画されることで
  // 他のコンポーネントも巻き込まれて再Suspendする
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 自作のLoadableクラスを用いたState
  const [data1] = useState(() => new Loadable(fetchData2()));
  const [data2] = useState(() => new Loadable(fetchData2()));
  const [data3] = useState(() => new Loadable(fetchData2()));

  // 0.1秒毎に更新される値を取得
  const time = useTime();

  // TransitionはuseTransitionから宣言することも、Reactからimportすることもできる
  // こちらはHooksらしくTransitionの粒度が細かい(自由に定義できる)
  const [namedIsPending, namedStartTransition] = useTransition();

  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <p className={"tabular-nums" + (namedIsPending ? " text-blue-700" : "")}>
        🕒 {time}
      </p>
      {/* <p className="tabular-nums">🕒 {time}</p> */}
      {/* <RenderingNotifier name="outside-Suspense" /> */}
      <Suspense fallback={<p>Loading...</p>}>
        {/* <RenderingNotifier name="inside-Suspense" /> */}
        {/* <p>
          Suspenseの配下は全てサスペンドに巻き込まれるため、これは描画されない
        </p> */}
        {/* <AlwaysSuspend /> */}
        {/* <SometimesSuspend /> */}
        {/* <FailedDataLoader /> */}
        {/* <NotGoodDataLoader /> */}
        <button className="border p-1" onClick={() => setCount1((c) => c + 1)}>
          NormalCount(count1) is {count1}
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

      <p>
        ↓↓↓↓↓↓↓startTransitionを使ったカウンタ更新DataLoader(連打してもSuspend後に描画が反映される)↓↓↓↓↓↓↓
      </p>
      <button
        className="border p-1"
        onClick={() => {
          namedStartTransition(() => {
            setCount2((c) => {
              console.log(`${c} --> ${c + 1}`);
              return c + 1;
            });
          });
        }}
      >
        TransitionCount(count2) is {count2}
      </button>
      <Suspense fallback={<p>Loading...</p>}>
        <SimilarQueryHookDataLoaderCustom count={count2} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <SimilarQueryHookDataLoaderWithLoadable count={count2} />
      </Suspense>
    </div>
  );
};

export default App;
