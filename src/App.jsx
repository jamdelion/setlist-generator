import React, { useState } from "react";
import logo from "./logo.svg";
import SpankyLogo from "./spankys.png";
import "./App.css";
import GigLengthFilter from "./components/GigLengthFilter";
import NumSetsFilter from "./components/NumSetsFilter";
import FriendlySlider from "./components/FriendlySlider";
import KnownTunesFilter from "./components/KnownTunesFilter";
import SetList from "./components/SetList";
import VibeFilter from "./components/VibeFilter";

function App() {
  const [numSets, setNumSets] = React.useState(2);
  const [gigLength, setGigLength] = React.useState(60);
  const [vibe, setVibe] = React.useState("Chilled");
  const [famFriendly, setFamFriendly] = React.useState(3); // out of 5
  const [bangersOnly, setBangersOnly] = React.useState(1); // out of 5
  const [generated, setGenerated] = React.useState(false);

  console.log(numSets, gigLength, vibe, famFriendly, bangersOnly);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={SpankyLogo} className='App-logo' alt='logo' />
        <p>Setlist Generator</p>
        <form>
          <GigLengthFilter value={gigLength} changeFunction={setGigLength} />
          <VibeFilter value={vibe} changeFunction={setVibe} />
          <NumSetsFilter value={numSets} changeFunction={setNumSets} />
          <FriendlySlider value={famFriendly} changeFunction={setFamFriendly} />
          <KnownTunesFilter
            value={bangersOnly}
            changeFunction={setBangersOnly}
          />
        </form>
        <section>
          <h2>Set List</h2>
          <SetList />
        </section>
      </header>
    </div>
  );
}

export default App;
