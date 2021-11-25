import React from "react";

export default function NumSetsFilter(props) {
  const numOfSets = [1, 2, 3];
  return (
    <fieldset>
      <legend>Number of sets</legend>
      {numOfSets.map((num) => (
        <label htmlFor={num}>
          {num}
          <input
            type='radio'
            name='categories'
            id={num}
            key={num}
            value={num}
            checked={num === num}
            onChange={(event) => props.setNumSets(event.target.value)}
          />
        </label>
      ))}
    </fieldset>
  );
}
