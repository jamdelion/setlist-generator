import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import GigLengthFilter from "./components/GigLengthFilter";
import NumSetsFilter from "./components/NumSetsFilter";
import FriendlySlider from "./components/FriendlySlider";
import KnownTunesFilter from "./components/KnownTunesFilter";
import SetList from "./components/SetList";

function App() {
  const [numSets, setNumSets] = React.useState(0);
  const [famFriendly, setFamFriendly] = React.useState(3);
  const [bangersOnly, setBangersOnly] = React.useState(1);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Setlist Generator</p>
        <form>
          <GigLengthFilter />
          <NumSetsFilter setNumSets={setNumSets} />
          <FriendlySlider value={famFriendly} changeFunction={setFamFriendly} />
          <KnownTunesFilter
            value={bangersOnly}
            changeFunction={setBangersOnly}
          />
          {/* vibe */}
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
