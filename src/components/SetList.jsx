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

  let scoredSongs = [];
  songNames.map(songName => {
    scoredSongs.push({
      name: songName,
      bangerScore: songs[songName].banger * state.bangersOnly,
      // more scores here
      totalScore: 0
    }
  )})

  // calculate the total score for each song
  scoredSongs.map(song => {
    return song.totalScore = song.bangerScore + 0;
  })


  // random selection of songs
  // function createRandomSetlists(numberOfSets) {
  //   var setlists = [];
  //   for (let i = 1; i <= numberOfSets; i++) {
  //     let randomSongs = sampleSize(songNames, numSongs / state.numSets)
  //     setlists.push({set: i, songs: randomSongs});
  //   }
  //   return setlists;
  // }

  // let randomSetlists = createRandomSetlists(state.numSets);

  // function getTopScoredSongs(numberOfSets) {
  //   let orderedSongs = scoredSongs.slice();
  //   orderedSongs.sort((a,b)=> b.totalScore - a.totalScore);
  //   // console.log("top 10 songs", orderedSongs.slice(0,9)
  //   var setlists = [];
  //   for (let i = 1; i <= numberOfSets; i++) {
  //     let songsForSetlist = orderedSongs.slice(0, numSongs / state.numSets)
  //     setlists.push({set: i, key: i, songs: songsForSetlist});
  //   }
  //   return setlists;
  // }

  function getRandomSongs(numberOfSongs) {
    return sampleSize(scoredSongs, numberOfSongs)
  }

  function getTopScoredSongs(numberOfSongs) {
    let orderedSongs = scoredSongs.slice();
    orderedSongs.sort((a,b)=> b.totalScore - a.totalScore);
    return orderedSongs.slice(0, numberOfSongs) // array of song objects, ordered from highest totalScore
  }

  function putSongsInSets(songs) {
    if (songs.length !== numSongs) return;
    const songsPerSet = Math.ceil(songs.length / state.numSets);
    return new Array(state.numSets).fill("").map((_, i) => {
      return songs.slice(i * songsPerSet, (i+1) * songsPerSet) // returns an array of numSet arrays of song objects
    })
  }

  let songsInSets = [];

  if (state.randomSetlist) {
    let songs = getRandomSongs(numSongs);
    songsInSets = putSongsInSets(songs);
  } else {
    let topSongs = getTopScoredSongs(numSongs);
    songsInSets = putSongsInSets(topSongs);
  }


  //   let songsWithSetNumber = {};
  //   for (let i = 1; i <= state.numSets; i++) {

  //     //     let songsForSetlist = orderedSongs.slice(0, numSongs / state.numSets)
  //     //     setlists.push({set: i, key: i, songs: songsForSetlist});
  //     //   }
  //   songs.map(song => {
  //     return {...song, }
  //   })


  // }

  return (
    <div>
      {/* {randomSetlists.map((x) => ( */}
        {songsInSets.map((set, index) => (
        <>
          <h1>Set {index + 1}</h1>
          <ol>{set.map((song) => <li key={song.name}>{song.name}</li>)}</ol>
        </>
      ))}
    </div>
  );

}
