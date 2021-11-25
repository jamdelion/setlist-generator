import React from "react";

export default function KnownTunesFilter(props) {
  return (
    <fieldset>
      <legend>Bangers only?</legend>
      <p>1 is bangers only, 5 is rogue tunes welcome </p>
      <label htmlFor='known-tunes'>
        {props.value}
        <input
          type='range'
          id='known-tunes'
          min='1'
          max='5'
          step='1'
          value={props.value}
          onChange={(event) => props.changeFunction(event.target.value)}
        />
      </label>
    </fieldset>
  );
}
