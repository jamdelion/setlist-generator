import React, { useContext } from "react";
import { SetlistContext } from "../App";
import { songs } from "../songs";
import { sampleSize } from "lodash";

export default function SetList() {
  const { state, dispatch } = useContext(SetlistContext);
  // props: { numSets, gigLength, vibe, famFriendly, bangersOnly, era }

  // sort out number of songs in set
  const AVG_MINS_PER_SONG = 3.5;
  let numSongs = Math.round(state.gigLength / AVG_MINS_PER_SONG); // doesn't yet handle "other";

  let songList = Object.keys(songs); // this needs to be the probability weighted list
  
  // random selection of songs
  function createSetlists(n) {
    var setlists = [];
    for (let i = 1; i <= n; i++) {
      let randomSongs = sampleSize(songList, numSongs / state.numSets)
      setlists.push({set: i, songs: randomSongs});
    }
    return setlists;
  }

  let setlists = createSetlists(state.numSets);

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
