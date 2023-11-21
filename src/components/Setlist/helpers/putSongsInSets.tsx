import { Song } from "../types/Song";

type Setlist = Song[][];

export const putSongsInSets = (
  songs: Song[],
  numSongs: number,
  numberOfSets: number
): Setlist => {
  if (songs.length !== numSongs) return [];
  const songsPerSet = Math.floor(songs.length / numberOfSets);
  return new Array(numberOfSets).fill("").map((_, i) => {
    return songs.slice(i * songsPerSet, (i + 1) * songsPerSet); // returns an array of numSet arrays of song objects
  });
};
