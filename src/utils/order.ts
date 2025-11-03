export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `AD-${timestamp}-${randomPart}`;
};
