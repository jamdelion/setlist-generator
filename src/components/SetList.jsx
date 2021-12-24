import React from "react";
import { songs } from "../songs";
import { sampleSize } from "lodash";

export default function SetList(props) {
  // props: { numSets, gigLength, vibe, famFriendly, bangersOnly }

  // sort out number of songs in set
  const AVG_MINS_PER_SONG = 3.5;
  let numSongs = Math.round(props.gigLength / AVG_MINS_PER_SONG); // doesn't yet handle "other";

  // random selection of songs
  let songList = Object.keys(songs);
  let randomSetList = sampleSize(songList, numSongs);

  const songItems = randomSetList.map((song) => <li key={song}>{song}</li>);

  function createSetlists(n) {
    var elements = [];
    for (let i = 1; i <= n; i++) {
      elements.push(i);
    }
    return elements;
  }

  let setlists = createSetlists(props.numSets);

  return (
    <div>
      {setlists.map((x) => (
        <>
          <h1>Set {x}</h1>
          <ol>{songItems}</ol>
          {/* TODO: songs need to be divided between sets */}
        </>
      ))}
    </div>
  );
}
