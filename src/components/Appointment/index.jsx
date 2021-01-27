import React from 'react';
import Header from 'components/Appointment/Header.jsx';
import Status from 'components/Appointment/Status.jsx';
import Show from 'components/Appointment/Show.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Form from 'components/Appointment/Form.jsx';
import Confirm from 'components/Appointment/Confirm.jsx';
import Error from 'components/Appointment/Error.jsx';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode.js';



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "FORM";
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


export default function Appointment(props) {
  
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

function save(name, interviewer) {
  
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING);

  props.bookInterview(props.id, interview)
  .then(() => transition(SHOW))
  .catch((error) => transition(ERROR_SAVE, true));

};

function remove(name, interviewer) {
  const interview = null
  transition(DELETING, true);
  props.cancelInterview(props.id, interview)
  .then((response) => {
    transition(EMPTY);
  })
  .catch(error => transition(ERROR_DELETE, true));

}


  return (
   
    <article data-testid="appointment" className="appointment">
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
      onEdit={() => transition(EDIT)}
      />)}
      {mode === CREATE && 
      <Form 
      onCancel={back}
      interviewers={props.interviewers}
      onSave={save}
      bookInterview={props.bookInterview}
      />} 
        {mode === EDIT && 
      <Form 
      onCancel={back}
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onSave={save}
      bookInterview={props.bookInterview}
      />} 
      {mode === CONFIRM && 
      <Confirm 
      onConfirm={() => remove(props.interview.student, props.interview.interviewer)} onCancel={back} />}
      {mode === SAVING && <Status message={'saving'} />}   
      {mode === DELETING && <Status message={'deleting'} />} 
      {mode === ERROR_SAVE && 
      <Error message={"Unable to save Appointment"} onClose={back} /> }
      {mode === ERROR_DELETE &&
      <Error message={"Unable to delete appointment"} onClose={back} />}
       </article>
  )
}