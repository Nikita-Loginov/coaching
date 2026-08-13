export const pluralize = (
  count: number,
  one: string,
  few: string,
  many: string
) => {
  const n = Math.abs(count) % 100;
  const last = n % 10;

  if (n >= 11 && n <= 19) {
    return many;
  }

  if (last === 1) {
    return one;
  }

  if (last >= 2 && last <= 4) {
    return few;
  }

  return many;
};
