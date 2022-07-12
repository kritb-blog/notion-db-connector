import cache from 'memory-cache';

interface CacheResult<T> {
  isCacheMissed: boolean;
  result: T;
}

export const cacheManager = async <T>(
  key: string,
  ttl: number,
  fetch: () => Promise<T>
): Promise<CacheResult<T>> => {
  if (!cache.get(key)) {
    const result = await fetch();
    cache.put(key, result, ttl);
    return {
      isCacheMissed: true,
      result,
    };
  }
  return {
    isCacheMissed: false,
    result: cache.get(key) as T,
  };
};
