import React, { Fragment }from 'react';
import Header from 'components/Appointment/Header.jsx';
import Show from 'components/Appointment/Show.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Form from 'components/Appointment/Form.jsx';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode.js';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "FORM";

export default function Appointment(props) {
  
const { mode, transition, back, history } = useVisualMode(
  props.interview ? SHOW : EMPTY
);



  return (
   
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />)}
      {mode === CREATE && 
      <Form 
      onCancel={back}
      interviewers={props.interviewers}
      history={history}
      />}     
       </article>
  )
}