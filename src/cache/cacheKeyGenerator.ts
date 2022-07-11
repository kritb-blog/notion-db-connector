export const cacheKeyGenerator = (
  databaseName: string,
  ...slugs: string[]
): string => {
  return `${databaseName}_${slugs.join('_')}`;
};
