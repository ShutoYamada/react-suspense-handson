import fetchData1 from "../../utils/fetchData1";
import { useData } from "./hooks";

/** useQueryに近い自作Hookを使ったDataLoader1 */
export const SimilarQueryHookDataLoader1: React.VFC = () => {
  const data = useData("SimilarQueryHookDataLoader1", fetchData1);
  return (
    <div>
      <div>Data is {data}</div>
    </div>
  );
};

/** useQueryに近い自作Hookを使ったDataLoader2 */
export const SimilarQueryHookDataLoader2: React.VFC = () => {
  const data = useData("SimilarQueryHookDataLoader2", fetchData1);
  return (
    <div>
      <div>Data is {data}</div>
    </div>
  );
};

/** countというPropsを受け取るバージョン */
export const SimilarQueryHookDataLoaderCustom: React.VFC<{ count: number }> = ({
  count,
}) => {
  // countの値が変わる度にSuspendが走る
  const data = useData(count.toString(), fetchData1);
  return (
    <div>
      <div>Data is {data}</div>
      <div>count is {count}</div>
    </div>
  );
};
