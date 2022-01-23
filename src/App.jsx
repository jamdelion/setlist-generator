import React, { useState, useReducer, createContext } from "react";
import logo from "./logo.svg";
import SpankyLogo from "./spankys.png";
import "./App.css";
import GigLengthFilter from "./components/GigLengthFilter";
import NumSetsFilter from "./components/NumSetsFilter";
import FriendlySlider from "./components/FriendlySlider";
import KnownTunesFilter from "./components/KnownTunesFilter";
import SetList from "./components/SetList";
import VibeFilter from "./components/VibeFilter";
import EraFilter from "./components/EraFilter";

const initialState = {
  gigLength: 60,
  numSets: 2,
  vibe: "Chilled",
  famFriendly: 3, // out of 5
  bangersOnly: 1,
  setlistGenerated: false,
  era: "90s",
};

function setlistReducer(state, action) {
  switch (action.type) {
    case "GIG_LENGTH_CHANGED":
      return { ...state, gigLength: action.payload };
    case "NUM_SETS_CHANGED":
      return { ...state, numSets: action.payload };
    case "VIBE_CHANGED":
      return { ...state, vibe: action.payload };
    case "FAM_FRIENDLY_CHANGED":
      return { ...state, famFriendly: action.payload };
    case "BANGERS_ONLY_CHANGED":
      return { ...state, bangersOnly: action.payload };
    case "ERA_CHANGED":
      return { ...state, era: action.payload };
    case "SETLIST_GENERATED":
      return { ...state, setlistGenerated: action.payload };
    default:
      return state;
  }
}

export const SetlistContext = createContext();

function App() {
  const [state, dispatch] = useReducer(setlistReducer, initialState);

  console.log("state", state);

  return (
    <div className="App">
      <header className="App-header">
        <img src={SpankyLogo} className="App-logo" alt="logo" />
        <p>Setlist Generator</p>
        <form>
          <SetlistContext.Provider value={{ state, dispatch }}>
            <GigLengthFilter />
            <VibeFilter />
            <NumSetsFilter />
            <FriendlySlider />
            <KnownTunesFilter />
            <EraFilter />
          </SetlistContext.Provider>
        </form>
        <button
          onClick={() => dispatch({ type: "SETLIST_GENERATED", payload: true })}
        >
          Generate Setlist{" "}
        </button>
        {/* TODO: reset generated to false when another value changed */}

        {state.setlistGenerated && (
          <section>
            <h2>Set List</h2>
            <SetlistContext.Provider value={{ state, dispatch }}>
              <SetList />
            </SetlistContext.Provider>
          </section>
        )}
      </header>
    </div>
  );
}

export default App;
