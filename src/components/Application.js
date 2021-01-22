import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from 'components/DayList.jsx';
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';


export default function Application(props) {
 const [state, setState] = useState({
   day: "Monday",
   days: [],
   appointments: {}
 });

 

//  const setDays = (days) => setState({...state, days})
 const setDay = day => setState({...state, day})

useEffect(() => {

  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ])
  .then((all) => {

    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
  })
  .catch(err => {
    console.log(err);
  })

}, [])
const dailyInterviewers = getInterviewersForDay(state, state.day);

function bookInterview(id, interview) {

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.put(`/api/appointments/${appointment.id}`, appointment )
  .then((response) => {
    console.log(response);
    console.log("Appointment!: ", appointments);
    setState({...state, appointments});
  })
  
  
};

function cancelInterview(id, interview) {
console.log('clicked')
  const appointment = {
    ...state.appointments[id],
    interview: {...interview}
  };



  const appointments = {
    ...state.appointments,
    [id]: appointment
  };


 return axios.delete(`/api/appointments/${appointment.id}`, appointment )
  .then((response) => {
    console.log('cancelled', response);
    setState({...state, appointments});
})

  
}

const dailyAppointments = getAppointmentsForDay(state, state.day);

const parsedAppointments = dailyAppointments.map(appointment => {
  const interview = getInterview(state, appointment.interview);
  return <Appointment 
          key={appointment.id} 
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={dailyInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
         />
});



  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList days={state.days} day={state.day} setDay={setDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        { parsedAppointments }
        <Appointment key="last" time="5pm" interviewers={dailyInterviewers} bookInterview={bookInterview} />
      </section>
    </main>
  );
}
