export const leadZero = (n?: number | null) => {
  if (n == null || n === 0) return "";
  if (n < 10) {
    return `0${n}`;
  }
  return n;
};
