/** 指定時間(ms)後にresolveする非同期処理 */
export default (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};