import React, { createContext, useReducer } from "react";
import "./App.css";
import EraFilter from "./components/EraFilter";
import FriendlySlider from "./components/FriendlySlider";
import GigLengthFilter from "./components/GigLengthFilter";
import KnownTunesFilter from "./components/KnownTunesFilter";
import NumSetsFilter from "./components/NumSetsFilter";
import SetList from "./components/Setlist/SetList";
import VibeFilter from "./components/VibeFilter";
import SpankyLogo from "./spanky_transparent.png";

const initialState = {
  gigLength: 90,
  numSets: 3,
  vibe: "Chilled",
  famFriendly: 0, // -5, 0 or 5
  bangersOnly: 1,
  setlistGenerated: false,
  era: "1995",
  randomSetlist: false,
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
    case "RANDOM_SETLIST_WANTED":
      return { ...state, randomSetlist: action.payload };
    default:
      return state;
  }
}

export const SetlistContext = createContext();

function App() {
  const [state, dispatch] = useReducer(setlistReducer, initialState);

  // console.log("state", state);

  return (
    <div className="App">
      <header className="App-container">
        <img src={SpankyLogo} className="App-logo" alt="logo" />
        <h1>Setlist Generator</h1>
        {state.setlistGenerated ? (
          <section>
            <h2>Set List</h2>
            <SetlistContext.Provider value={{ state, dispatch }}>
              <SetList />
            </SetlistContext.Provider>
            <button
              onClick={() => {
                // show form again
                dispatch({ type: "SETLIST_GENERATED", payload: false });
              }}
            >
              Return to form
            </button>
          </section>
        ) : (
          <>
            <form className="App-form">
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
              onClick={() => {
                dispatch({ type: "RANDOM_SETLIST_WANTED", payload: false });
                dispatch({ type: "SETLIST_GENERATED", payload: true });
              }}
            >
              Generate Setlist
            </button>
          </>
        )}

        <button
          onClick={() => {
            dispatch({ type: "RANDOM_SETLIST_WANTED", payload: true });
            dispatch({ type: "SETLIST_GENERATED", payload: true });
          }}
        >
          Generate Random Setlist
        </button>
      </header>
    </div>
  );
}

export default App;

// A copy of songs with probability weightings. These weightings are adjusted by each filter.
// Then put the songs in an list with the higher weighted songs in the list multiple times, then random choice from there. Myabe have an "obligatory" flag which guarantees that those songs will be included (also feature - random setlist with song requests accommodated).

//  each filter has a number on a scale for each option, each song has a score for each factor too, and they are multiplied together, added to the song's "total score", and then the top whatever of these songs are put in the setlist

// then will have to order those songs appropriately
