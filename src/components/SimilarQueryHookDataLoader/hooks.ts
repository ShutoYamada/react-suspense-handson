import Loadable from "../../types/Loadable";

// グローバルに定義したキャッシュデータのマップ
const dataMap: Map<string, unknown> = new Map();

/** 
 * データマップの汎用Hooks 
 * @param cacheKey キー
 * @param fetch フェッチ処理
 * */
export const useData = <T,>(cacheKey: string, fetch: () => Promise<T>): T => {
  const cachedData = dataMap.get(cacheKey) as T | undefined;
  if (cachedData === undefined) {
    throw fetch().then((d) => dataMap.set(cacheKey, d));
  }
  return cachedData;
};

export const useDataCustom = <T,>(cacheKey: string, fetch: () => Promise<T>): T => {
  const cachedData = dataMap.get(cacheKey) as Loadable<T> | undefined;
  if (cachedData === undefined) {
    const [loadable, promise] = Loadable.newAndGetPromise(fetch());
    dataMap.set(cacheKey, loadable);
    throw promise;
  }
  return cachedData.getOrThrow();
};