import fetchData1 from "../utils/fetchData1";

let data: string | undefined;

/** 原始的なDataLoader(グローバル変数使用版) */
export const DataLoader: React.VFC = () => {
  // dataがまだ無ければローディングを開始する
  if (data === undefined) {
    throw fetchData1().then((d) => (data = d));
  }

  // データがあればそれを表示
  return (
    <div>
      <div>Data is {data}</div>
    </div>
  );
};
