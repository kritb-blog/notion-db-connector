import { cacheManager } from './cacheManager';

describe('cacheManager', () => {
  it('should get data from cache if available', async () => {
    const fetch = async () => await Promise.resolve('SampleValue');
    const { isCacheMissed, result } = await cacheManager<string>(
      'cache_key',
      4000,
      fetch
    );
    expect(isCacheMissed).toBeTruthy();
    expect(result).toEqual('SampleValue');

    const { isCacheMissed: afterCachedIsCacheMissed, result: cachedResult } =
      await cacheManager<string>('cache_key', 4000, fetch);
    expect(afterCachedIsCacheMissed).toBeFalsy();
    expect(cachedResult).toEqual('SampleValue');
  });
});
