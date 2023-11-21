import React, { useContext } from "react";
import { SetlistContext } from "../../App";
import { songs } from "../../songs";
import { getRandomSongs } from "./helpers/getRandomSongs";
import { getTopScoredSongs } from "./helpers/getTopScoredSongs";
import { putSongsInSets } from "./helpers/putSongsInSets";
import { filterByEra } from "./helpers/filterByEra";

const AVG_MINS_PER_SONG = 3.5;

export default function SetList() {
  const { state, dispatch } = useContext(SetlistContext);
  // props: { numSets, gigLength, vibe, famFriendly, bangersOnly, era }

  // sort out number of songs in set
  let numSongs = Math.round(state.gigLength / AVG_MINS_PER_SONG); // doesn't yet handle "other";

  let songNames = Object.keys(songs);

  let scoredSongs = [];
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

  // calculate the total score for each song
  scoredSongs.map((song) => {
    return (song.totalScore =
      song.bangerScore + song.filthyScore + song.eraScore);
  });

  let songsInSets = [];

  if (state.randomSetlist) {
    let songs = getRandomSongs(numSongs);
    songsInSets = putSongsInSets(songs);
  } else {
    let topSongs = getTopScoredSongs(numSongs);
    songsInSets = putSongsInSets(topSongs);
  }

  return (
    <div>
      {songsInSets.map((set, index) => (
        <>
          <h1>Set {index + 1}</h1>
          <ol>
            {set.map((song) => (
              <li key={song.name}>{song.name}</li>
            ))}
          </ol>
        </>
      ))}
    </div>
  );
}
