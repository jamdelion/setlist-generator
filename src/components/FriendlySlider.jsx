import React, { useContext } from "react";
import { SetlistContext } from "../App";

export default function FriendlySlider(props) {
  const { state, dispatch } = useContext(SetlistContext);
  return (
    <fieldset>
      <legend>Family friendly?</legend>
      <p>1 is very friendly, 5 is filthy! </p>
      <label htmlFor='family-friendly'>
        {state.famFriendly}
        <input
          type='range'
          id='family-friendly'
          min='1'
          max='5'
          step='1'
          value={state.famFriendly}
          onChange={(e) =>
            dispatch({
              type: "FAM_FRIENDLY_CHANGED",
              payload: e.target.value,
            })}
        />
      </label>
    </fieldset>
  );
}
