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