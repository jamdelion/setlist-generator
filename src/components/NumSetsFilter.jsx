import React, { useState } from "react";

export default function NumSetsFilter(props) {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    props.changeFunction(event.target.value);
  };

  const numOfSets = [1, 2, 3];

  return (
    <fieldset>
      <legend>Number of sets</legend>
      {numOfSets.map((num) => (
        <label htmlFor={num}>
          {num}
          <input
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
            type='radio'
            name='categories'
            id={num}
            key={num}
            value={num}
            onClick={handleChange}
          />
        </label>
      ))}
    </fieldset>
  );
}
