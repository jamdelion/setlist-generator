export const putSongsInSets = (songs) => {
  if (songs.length !== numSongs) return;
  const songsPerSet = Math.floor(songs.length / state.numSets);
  return new Array(parseInt(state.numSets)).fill("").map((_, i) => {
    return songs.slice(i * songsPerSet, (i + 1) * songsPerSet); // returns an array of numSet arrays of song objects
  });
};
