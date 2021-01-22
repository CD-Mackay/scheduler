import React from 'react';
import useVisualMode from 'hooks/useVisualMode.js';
import { create } from 'react-test-renderer';

export default function Empty(props) {

  const { mode, transition, back } = useVisualMode();
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "FORM";

  return (
    <main className="appointment__add" >
  <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={props.onAdd}
    
  />
</main>
  )
}