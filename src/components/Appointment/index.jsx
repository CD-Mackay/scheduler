import React, { Fragment } from 'react';
import Header from 'components/Appointment/Header.jsx';
import Status from 'components/Appointment/Status.jsx';
import Show from 'components/Appointment/Show.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Form from 'components/Appointment/Form.jsx';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode.js';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "FORM";
const SAVING = 'SAVING';

export default function Appointment(props) {
  
const { mode, transition, back, history } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

function save(name, interviewer) {
  transition(SAVING);
  const interview = {
    student: name,
    interviewer
  };

  console.log("interview obj", interview);

  props.bookInterview(props.id, interview)
  .then((response) => {
    transition(SHOW);
  })
 

 


  return interview;
};





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
      />)}
      {mode === CREATE && 
      <Form 
      onCancel={back}
      interviewers={props.interviewers}
      history={history}
      onSave={save}
      bookInterview={props.bookInterview}
      />} 
      {mode === SAVING && <Status message={'saving'} />}    
       </article>
  )
}