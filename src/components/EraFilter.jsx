import React, { useContext } from "react";
import { SetlistContext } from "../App";

export default function EraFilter(props) {
  const { state, dispatch } = useContext(SetlistContext);
  return (
    <fieldset>
      <legend>Era</legend>
      <select
        name='era'
        value={state.era}
        onChange={(e) =>
          dispatch({
            type: "ERA_CHANGED",
            payload: e.target.value,
          })}>
        <option value='50s'>50s</option>
        <option value='60s'>60s</option>
        <option value='70s' defaultValue>
          70s
        </option>
        <option value='80s'>80s</option>
        <option value='90s'>90s</option>
        <option value='2000s'>2000s</option>
        <option value='2010s'>2010s</option>
      </select>
    </fieldset>
  );
}
