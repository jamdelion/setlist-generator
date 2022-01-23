import React, { useContext } from "react";
import { SetlistContext } from "../App";

export default function VibeFilter(props) {
  const { state, dispatch } = useContext(SetlistContext);
  return (
    <fieldset>
      <legend>Vibe</legend>
      <select
        value={state.vibe}
        onChange={(e) =>
          dispatch({
            type: "VIBE_CHANGED",
            payload: e.target.value,
          })}
        name='vibe'>
        <option value='religious'>Religious</option>
        <option value='nerdy'>Nerdy</option>
        <option value='chilled' defaultValue>
          Chilled
        </option>
        <option value='wild'>Wild</option>
        <option value='too posh'>Too posh to clap</option>
        <option value='other'>Other</option>
      </select>
    </fieldset>
  );
}
