import { useState } from "react";

// A custom hook that exports three functions the app is going to use. Explanation of each below.
export default function useVisualMode(initial) {
  
  // 'mode' refers to the visual state each block of appointment is in, this will change depending on user interaction
  const [mode, setMode] = useState(initial);

  // 'history' is the history of the user's interaction with the the appoinment block
  const [history, setHistory] = useState([initial]);

  // this function changes the visual 'mode' in an appointment block based on user behavior, it also adds the current mode to the history
  const transition = function(newMode, replace = false) {
    if (!replace) {
      history.push(newMode);
    }
    setMode(newMode);
    setHistory(history);
  }

  // this function allows the user to go back one step
  const back = function() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } else {
      setMode(history[0]);
    }
  }

  return {mode, transition, back};
}