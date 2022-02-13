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

  let songNames = Object.keys(songs); // this needs to be the probability weighted list

  let scoredSongs = {}
  songNames.forEach((songName, index) => {
    return scoredSongs[songName] = {
      bangerScore: songs[songName].banger * state.bangersOnly,
      // more scores here
      totalScore: 0
    }
  })
  console.log("scoredSongs", scoredSongs)

  // calculate the total score for each song
  songNames.forEach((song, index) => {
    return scoredSongs[song].totalScore = scoredSongs[song].bangerScore + 0;
  })

  console.log("scoredSongs with total", scoredSongs)


  
  // random selection of songs
  function createRandomSetlists(numberOfSets) {
    var setlists = [];
    for (let i = 1; i <= n; i++) {
      let randomSongs = sampleSize(songNames, numSongs / state.numSets)
      setlists.push({set: i, songs: randomSongs});
    }
    return setlists;
  }

  let randomSetlists = createRandomSetlists(state.numSets);

  return (
    <div>
      {randomSetlists.map((x) => (
        <>
          <h1>Set {x.set}</h1>
          <ol>{x.songs.map((song) => <li key={song}>{song}</li>)}</ol>
        </>
      ))}
    </div>
  );

}
