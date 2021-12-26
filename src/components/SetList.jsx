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

  function createSetlists(n) {
    var setlists = [];
    for (let i = 1; i <= n; i++) {
      let randomSongs = sampleSize(songList, numSongs / props.numSets)
      setlists.push({set: i, songs: randomSongs});
    }
    return setlists;
  }

  let setlists = createSetlists(props.numSets);

  return (
    <div>
      {setlists.map((x) => (
        <>
          <h1>Set {x.set}</h1>
          <ol>{x.songs.map((song) => <li key={song}>{song}</li>)}</ol>
        </>
      ))}
    </div>
  );

}
