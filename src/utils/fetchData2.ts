import sleep from "./sleep";

/** 任意の秒後にデータを返却する */
export default async (): Promise<string> => {
  await sleep(Math.floor(Math.random() * 1000));
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}