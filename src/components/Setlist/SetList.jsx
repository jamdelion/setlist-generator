import React, { useContext } from "react";
import { SetlistContext } from "../../App";
import { getRandomSongs } from "./helpers/getRandomSongs";
import {
  constructScoredSongs,
  getTopScoredSongs,
} from "./helpers/getTopScoredSongs";
import { putSongsInSets } from "./helpers/putSongsInSets";

const AVG_MINS_PER_SONG = 3.5;

export default function SetList() {
  const { state, dispatch } = useContext(SetlistContext);
  // props: { numSets, gigLength, vibe, famFriendly, bangersOnly, era }

  // sort out number of songs in set
  let numSongs = Math.round(state.gigLength / AVG_MINS_PER_SONG); // doesn't yet handle "other";

  const scoredSongs = constructScoredSongs(state);
  // calculate the total score for each song
  scoredSongs.map((song) => {
    return (song.totalScore =
      song.bangerScore + song.filthyScore + song.eraScore);
  });

  let songsInSets = [];

  if (state.randomSetlist) {
    let songs = getRandomSongs(numSongs, scoredSongs);
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
              <li draggable key={song.name}>
                {song.name}
              </li>
            ))}
          </ol>
        </>
      ))}
    </div>
  );
}
