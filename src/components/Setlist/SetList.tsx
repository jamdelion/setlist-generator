import React, { useContext } from "react";
import { SetlistContext } from "../../App";
import { getRandomSongs } from "./helpers/getRandomSongs";
import {
  constructScoredSongs,
  getTopScoredSongs,
} from "./helpers/getTopScoredSongs";
import { putSongsInSets } from "./helpers/putSongsInSets";
import { Song } from "./types/Song";

const AVG_MINS_PER_SONG = 3.5;

export default function SetList() {
  const { state, dispatch } = useContext(SetlistContext);
  // props: { numSets, gigLength, vibe, famFriendly, bangersOnly, era }

  // sort out number of songs in set
  const numSongs = Math.round(state.gigLength / AVG_MINS_PER_SONG); // doesn't yet handle "other";

  const scoredSongs: Song[] = constructScoredSongs(state);
  // calculate the total score for each song
  scoredSongs.map((song) => {
    return (song.totalScore =
      song.bangerScore + song.filthyScore + song.eraScore);
  });

  let songsInSets: Song[][] = [];

  if (state.randomSetlist) {
    const songs = getRandomSongs(numSongs, scoredSongs);
    songsInSets = putSongsInSets(songs, numSongs, state.numSets);
  } else {
    const topSongs = getTopScoredSongs(numSongs);
    songsInSets = putSongsInSets(topSongs, numSongs, state.numSets);
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
