import React, { Fragment } from 'react';
import Header from 'components/Appointment/Header.jsx';
import Status from 'components/Appointment/Status.jsx';
import Show from 'components/Appointment/Show.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Form from 'components/Appointment/Form.jsx';
import Confirm from 'components/Appointment/Confirm.jsx';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode.js';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "FORM";
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {
  
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

function save(name, interviewer) {
  transition(SAVING);
  const interview = {
    student: name,
    interviewer
  };


  props.bookInterview(props.id, interview)
  .then((response) => {
    transition(SHOW);
  })

};

function remove(name, interviewer) {
  console.log("name and interviewer", name, interviewer);
  const interview = null
  transition(DELETING);
  props.cancelInterview(props.id, interview)
  .then((response) => {
    transition(EMPTY);
  })

}


  return (
   
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      interview={props.interview}
      student={props.student}
      interviewer={props.interviewer}
      bookInterview={props.bookInterview}
      cancelInterview={props.cancelInterview}
      onDelete={() => transition(CONFIRM)}
      />)}
      {mode === CREATE && 
      <Form 
      onCancel={back}
      interviewers={props.interviewers}
      onSave={save}
      bookInterview={props.bookInterview}
      />} 
      {mode === CONFIRM && 
      <Confirm 
      onConfirm={() => remove(props.interview.student, props.interview.interviewer)} onCancel={back} />}
      {mode === SAVING && <Status message={'saving'} />}   
      {mode === DELETING && <Status message={'deleting'} />} 
       </article>
  )
}