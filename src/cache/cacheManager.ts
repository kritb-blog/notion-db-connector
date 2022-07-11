import cache from 'memory-cache';

export const cacheManager = async <T>(
  key: string,
  ttl: number,
  fetch: () => Promise<T>
): Promise<T> => {
  if (!cache.get(key)) {
    console.log(`Cache ${key} missed`);
    const value = await fetch();
    cache.put(key, value, ttl);
  }
  return cache.get(key) as T;
};
