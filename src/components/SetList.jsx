import React, { useContext, useState } from "react";
import { SetlistContext } from "../App";
import { songs } from "../songs";
import { sampleSize } from "lodash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function SetList() {
  const { state, dispatch } = useContext(SetlistContext);
  // props: { numSets, gigLength, vibe, famFriendly, bangersOnly, era }

  const [songOrder, setSongOrder] = useState([]);

  // sort out number of songs in set
  const AVG_MINS_PER_SONG = 3.5;
  let numSongs = Math.round(state.gigLength / AVG_MINS_PER_SONG); // doesn't yet handle "other";

  let songNames = Object.keys(songs);

  function filterByEra(songYear, midOfEra) {
    if (Math.abs(parseInt(midOfEra) - songYear) <= 5) return 1;
    else return 0;
  }

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

  function getRandomSongs(numberOfSongs) {
    return sampleSize(scoredSongs, numberOfSongs);
  }

  function getTopScoredSongs(numberOfSongs) {
    let orderedSongs = scoredSongs.slice();
    orderedSongs.sort((a, b) => b.totalScore - a.totalScore);
    return orderedSongs.slice(0, numberOfSongs); // array of song objects, ordered from highest totalScore
  }

  function putSongsInSets(songs) {
    if (songs.length !== numSongs) return;
    const songsPerSet = Math.floor(songs.length / state.numSets);
    return new Array(parseInt(state.numSets)).fill("").map((_, i) => {
      return songs.slice(i * songsPerSet, (i + 1) * songsPerSet); // returns an array of numSet arrays of song objects
    });
  }

  let songsInSets = [];

  if (state.randomSetlist) {
    let songs = getRandomSongs(numSongs);
    songsInSets = putSongsInSets(songs);
  } else {
    let topSongs = getTopScoredSongs(numSongs);
    songsInSets = putSongsInSets(topSongs);
  }

  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    let updatedList = [...songOrder];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setSongOrder(updatedList);
  };

  return (
    <div>
      {/* {songsInSets.map((set, index) => ( */}
        <>
          {/* <h1>Set {index + 1}</h1> */}
          <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {songOrder.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      className="item-container"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
          {/* <ol>
            {set.map((song) => (
              <li key={song.name}>{song.name}</li>
            ))}
          </ol> */}
        </>
      {/* ))} */}
    </div>
  );
}
