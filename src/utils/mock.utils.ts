export const mockApiCallTime = async () => {
  const timer = Math.floor(Math.random() * 2000);

  return await new Promise((resolve) => setTimeout(resolve, timer));
};
