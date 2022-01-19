/** 指定時間(ms)後にresolveする非同期処理 */
const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const AlwaysSuspend: React.VFC = () => {
  throw sleep(1000);
};

export default AlwaysSuspend;
