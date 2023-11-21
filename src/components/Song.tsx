import React from "react";
import { Song } from "./Setlist/types/Song";

export const SetOfSongs = (setNumber: string) => {
  console.log("setnumber", setNumber);
  return (
    <div>
      <h1>Set {setNumber}</h1>
      {/* <ol>
        {songs.map((song) => {
          return <li key={song.name}>{song.name}</li>;
        })}
      </ol> */}
    </div>
  );
};
