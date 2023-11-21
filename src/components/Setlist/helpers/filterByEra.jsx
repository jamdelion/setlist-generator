export const filterByEra = (songYear, midOfEra) => {
  if (Math.abs(parseInt(midOfEra) - songYear) <= 5) return 1;
  else return 0;
};
