export const sleep = (ms: Number) => new Promise(
  resolve => setTimeout(resolve, ms));
