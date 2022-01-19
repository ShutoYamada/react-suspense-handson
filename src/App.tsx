import { Suspense } from "react";
import "./App.css";
import AlwaysSuspend from "./components/AlwaysSusopend";

function App() {
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <p>
          Suspenseの配下は全てサスペンドに巻き込まれるため、これは描画されない
        </p>
        <AlwaysSuspend />
      </Suspense>
    </div>
  );
}

export default App;
