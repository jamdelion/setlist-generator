import React from "react";
import { songs } from "../songs";
import {sampleSize} from 'lodash';

export default function SetList(props) {


  // numSets={numSets}
  // gigLength={gigLength}
  // vibe={vibe}
  // famFriendly={famFriendly}
  // bangersOnly={bangersOnly}

  // sort out number of songs in set
  const AVG_MINS_PER_SONG = 3.5;
  let numSongs = Math.round(props.gigLength / AVG_MINS_PER_SONG) // doesn't yet handle "other";

  // random selection of songs
  let songList = Object.keys(songs);
  let randomSetList = sampleSize(songList, numSongs)


  const songItems = randomSetList.map((song) => <li key={song}>{song}</li>);
  return (
    <ol>
     {songItems}
    </ol>
  );
}
