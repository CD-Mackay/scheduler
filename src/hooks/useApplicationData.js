import axios from 'axios';
import React, { useState, useEffect } from 'react';
export default function useApplicationData() {


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
    };

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

    function spotsRemaining() {
      
    }

    return {  state, 
      setDay,
      bookInterview,
      cancelInterview }
}

