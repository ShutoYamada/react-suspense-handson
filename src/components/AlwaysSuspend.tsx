import sleep from "../utils/sleep";

const AlwaysSuspend: React.VFC = () => {
  console.log("AlwaysSuspend is rendered");
  throw sleep(1000);
};

export default AlwaysSuspend;
