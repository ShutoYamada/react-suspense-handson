import { Suspense, useState } from "react";
import "./App.css";
// import AlwaysSuspend from "./components/AlwaysSuspend";
import RenderingNotifier from "./components/RenderingNotifier";
import { SometimesSuspend } from "./components/SometimeSuspend";

const App = () => {
  // 再描画用のカウンタ
  // Suspense配下のcountを参照しているコンポーネントが再描画されることで
  // 他のコンポーネントも巻き込まれて再Suspendする
  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <RenderingNotifier name="outside-Suspense" />
      <Suspense fallback={<p>Loading...</p>}>
        <p>
          Suspenseの配下は全てサスペンドに巻き込まれるため、これは描画されない
        </p>
        {/* <AlwaysSuspend /> */}
        <SometimesSuspend />
        {/* <RenderingNotifier name="inside-Suspense" /> */}
        <button className="border p-1" onClick={() => setCount((c) => c + 1)}>
          {count}
        </button>
      </Suspense>
    </div>
  );
};

export default App;
