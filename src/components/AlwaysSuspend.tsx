import sleep from "../utils/sleep";

/** 常にSuspendするコンポーネント */
const AlwaysSuspend: React.VFC = () => {
  console.log("AlwaysSuspend is rendered");
  throw sleep(1000);
};

export default AlwaysSuspend;
