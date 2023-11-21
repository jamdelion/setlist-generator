import { songs } from "../../../songs";
import { filterByEra } from "./filterByEra";

let scoredSongs = [];
export const constructScoredSongs = (state) => {
  let songNames = Object.keys(songs);

  songNames.map((songName) => {
    scoredSongs.push({
      name: songName,
      bangerScore: songs[songName].banger * state.bangersOnly,
      filthyScore: songs[songName].dirty * state.famFriendly,
      eraScore: filterByEra(songs[songName].year, state.era),
      // more scores here
      totalScore: 0,
    });
  });
};

export const getTopScoredSongs = (numberOfSongs) => {
  let orderedSongs = scoredSongs.slice();
  orderedSongs.sort((a, b) => b.totalScore - a.totalScore);
  return orderedSongs.slice(0, numberOfSongs); // array of song objects, ordered from highest totalScore
};
