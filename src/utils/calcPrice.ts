export const calcPrice = (
  gb: number,
  pricePerGb?: number,
  discount?: boolean | null
) => {
  if (pricePerGb == null) return;
  const priceForStorage = gb * pricePerGb;
  return discount
    ? 0.9 * priceForStorage // 10% discount on upfront payment
    : priceForStorage;
};
