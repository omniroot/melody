export const getCurrentPercent = (currentTime: number, duration: number) => {
  return Math.floor((currentTime / duration) * 100);
};
