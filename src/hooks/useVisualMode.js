import React, { useState } from 'react';

export default function useVisualMode(inputMode){

  const [mode, setMode] = useState(inputMode);
  const [history, setHistory] = useState([inputMode]);



  function transition(input, replace = false) {
    if(replace) {
      setMode(input);
      setHistory([...history.slice(0, -1), input]);
    } else {
    setMode(input);
    setHistory(prevHistory => [...prevHistory, input]);
    }
  }

  function back(){
    let previousMode = history.pop();
    if (history.length >= 1) {
    setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back, };

 
}
