export const getTopScoredSongs = (numberOfSongs) => {
  let orderedSongs = scoredSongs.slice();
  orderedSongs.sort((a, b) => b.totalScore - a.totalScore);
  return orderedSongs.slice(0, numberOfSongs); // array of song objects, ordered from highest totalScore
};
