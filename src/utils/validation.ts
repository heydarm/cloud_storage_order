export const removeNotNumbers = (value?: string) => {
  if (value == null) return null;
  return value.replace(/\D/g, "");
};
