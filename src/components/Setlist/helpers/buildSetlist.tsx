import { sampleSize } from "lodash";
import { Song } from "../types/Song";
import { filterByEra } from "./filterByEra";

const AVG_MINS_PER_SONG = 3.5;

export const buildSetlist = (
  songs: Song[],
  userOptions: {
    gigLength: number;
    bangersOnlyLevel: number;
    famFriendlyLevel: number;
    era: string;
    randomify: boolean;
    numberOfSets: number;
  }
): Song[][] => {
  // sort out number of songs in set
  const totalNumberOfSongsToPlay = Math.round(
    userOptions.gigLength / AVG_MINS_PER_SONG
  ); // doesn't yet handle "other";

  let scoredSongs: Song[] = [];
  const songNames = Object.keys(songs);
  songNames.map((songName) => {
    scoredSongs.push({
      name: songName,
      bangerScore: songs[songName].banger * userOptions.bangersOnlyLevel,
      filthyScore: songs[songName].dirty * userOptions.famFriendlyLevel,
      eraScore: filterByEra(songs[songName].year, userOptions.era),
      // more scores here
      totalScore: 0,
    });
  });

  // calculate the total score for each song
  scoredSongs.map((song) => {
    return (song.totalScore =
      song.bangerScore + song.filthyScore + song.eraScore);
  });
  if (userOptions.randomify) {
    scoredSongs = sampleSize(scoredSongs, totalNumberOfSongsToPlay);
  } else {
    scoredSongs
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, totalNumberOfSongsToPlay);
  }

  if (scoredSongs.length !== totalNumberOfSongsToPlay) return [];
  const songsPerSet = Math.floor(scoredSongs.length / userOptions.numberOfSets);
  const finalSongs = new Array(userOptions.numberOfSets).fill("");
  const finalSongs2 = finalSongs.map((_, i) => {
    return scoredSongs.slice(i * songsPerSet, (i + 1) * songsPerSet); // returns an array of numSet arrays of song objects
  });
  return finalSongs2;
};
