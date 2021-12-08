import React from "react";

export default function GigLengthFilter(props) {
  return (
    <fieldset>
      <legend>Gig length</legend>
      <select
        name='gig-length'
        value={props.value}
        onChange={(event) => props.changeFunction(event.target.value)}>
        <option value='30'>30 minutes</option>
        <option value='45'>45 minutes</option>
        <option value='60' selected>
          1 hour
        </option>
        <option value='90'>90 minutes</option>
        <option value='120'>2 hours</option>
        <option value='other'>Other</option>
      </select>
    </fieldset>
  );
}
