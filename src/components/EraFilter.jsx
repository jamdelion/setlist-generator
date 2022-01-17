import React from "react";

export default function EraFilter(props) {
  return (
    <fieldset>
      <legend>Era</legend>
      <select
        name='era'
        value={props.value}
        onChange={(event) => props.changeFunction(event.target.value)}>
        <option value='50s'>50s</option>
        <option value='60s'>60s</option>
        <option value='70s' selected>
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
