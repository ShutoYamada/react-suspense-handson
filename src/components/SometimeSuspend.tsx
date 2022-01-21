import sleep from "../utils/sleep";

/** ある一定の確率で描画が完了するコンポーネント */
export const SometimesSuspend: React.VFC = () => {
  // 50%でSuspendする
  if (Math.random() < 0.5) {
    throw sleep(1000);
  }
  return <p>SometimeSuspend is rendered.</p>;
};
