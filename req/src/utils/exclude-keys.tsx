export const excludeKeys = (
  obj: Record<string, any>,
  keysToExclude: string[]
) => {
  return Object.keys(obj).reduce((result: any, key) => {
    if (!keysToExclude.includes(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};
