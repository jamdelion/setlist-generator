import { sampleSize } from "lodash";

export const getRandomSongs = (numberOfSongs, scoredSongs) => {
  return sampleSize(scoredSongs, numberOfSongs);
};
