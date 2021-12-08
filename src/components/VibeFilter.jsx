import React from "react";

export default function VibeFilter(props) {
  return (
    <fieldset>
      <legend>Vibe</legend>
      <select
        value={props.value}
        onChange={(event) => props.changeFunction(event.target.value)}
        name='vibe'>
        <option value='religious'>Religious</option>
        <option value='nerdy'>Nerdy</option>
        <option value='chilled' selected>
          Chilled
        </option>
        <option value='wild'>Wild</option>
        <option value='too posh'>Too posh to clap</option>
        <option value='other'>Other</option>
      </select>
    </fieldset>
  );
}
