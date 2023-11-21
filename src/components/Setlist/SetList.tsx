// @ts-nocheck
import React, { useContext, useEffect, useRef } from "react";
import { SetlistContext } from "../../App";
import { songs } from "../../songs";
import { buildSetlist } from "./helpers/buildSetlist";
import { Song } from "./types/Song";
import { SetOfSongs } from "../Song";

export default function SetList() {
  const { state, dispatch } = useContext(SetlistContext);
  const [flatSetlist, setFlatSetlist] = [];
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragEnter = (e) => {
    dragOverItem.current = e.currentTarget.id;
  };
  const dragStart = (e) => {
    dragItem.current = e.target.id;
  };
  const drop = () => {
    const copyListItems = [];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
  };
  // props: { numSets, gigLength, vibe, famFriendly, bangersOnly, era }

  useEffect(() => {
    const setlist: Song[][] = buildSetlist(songs, {
      gigLength: state.gigLength,
      bangersOnlyLevel: state.bangersOnly,
      famFriendlyLevel: state.famFriendly,
      era: state.era,
      randomify: state.randomSetlist,
      numberOfSets: state.numSets,
    });

    dispatch({ type: "SETLIST_DETERMINED", payload: setlist });
    dispatch({ type: "FLAT_SETLIST_DETERMINED", payload: setlist.flat() });
  }, [
    state.gigLength,
    state.bangersOnly,
    state.famFriendly,
    state.era,
    state.randomSetlist,
    state.numSets,
  ]);

  console.log("state.songListInSets", state.songListInSets);
  return (
    <div>
      {state.songListInSets.map((set, index) => (
        <SetOfSongs key={index} setNumber={index} />
      ))}
    </div>
  );
}

