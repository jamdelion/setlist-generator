import React from "react";

export default function FriendlySlider(props) {
  return (
    <fieldset>
      <legend>Family friendly?</legend>
      <p>1 is very friendly, 5 is filthy! </p>
      <label htmlFor='family-friendly'>
        {props.value}
        <input
          type='range'
          id='family-friendly'
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
