import sleep from "./sleep";

/** 1秒後にデータを返却する */
export default async (): Promise<string> => {
  await sleep(1000);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}