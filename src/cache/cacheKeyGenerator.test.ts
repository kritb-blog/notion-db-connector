import { cacheKeyGenerator } from './cacheKeyGenerator';

describe('cacheKeyGenerator', () => {
  it('should generator cache key correctly', () => {
    const cacheKey = cacheKeyGenerator(
      'databaseId',
      JSON.stringify({ filter: { select: { equal: 'sample_filter' } } }),
      JSON.stringify({ sort: { sample: 'sort' } })
    );

    expect(cacheKey).toEqual(
      'databaseId_{"filter":{"select":{"equal":"sample_filter"}}}_{"sort":{"sample":"sort"}}'
    );
  });
});
