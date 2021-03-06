import React, {useState} from 'react';

import 'components/Appointment/styles.scss';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';
import useVisualMode from 'hooks/useVisualMode.js';

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Form (props) {
 
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  useVisualMode(props.interview? SHOW : EMPTY);

  const reset = function() {
    setName("");
    setInterviewer(null);
  }

  const cancel = function() {
    reset();
    props.onCancel();
  }

  const saveForm = function() {
    setName(props.name);
    setInterviewer(props.interviewer);
    props.onSave(name, interviewer)
    
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return
    }
    if (!interviewer) {
      setError("Interviewer must be selected")
      return
    }  
      setError("");
      props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          data-testid="student-name-input"
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <section className="appointment__validation">{error}</section>
      </form>
      
      <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={saveForm, validate}>Save</Button>
      </section>
    </section>
  </main>
  )
}