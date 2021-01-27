import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getAppointmentsForDay } from 'helpers/selectors';
import { template } from '@babel/core';
export default function useApplicationData() {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

 const setDay = day => setState({...state, day})

 useEffect(() => {
   Promise.all([
     axios.get('/api/days'),
     axios.get('/api/appointments'),
     axios.get('/api/interviewers')
   ])
   .then((all) => {
     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
   })
   .catch(err => {
     console.log(err);
   })
 }, [])

 function spotsRemaining(day, days, appointments) {
   let bookedAppointments = 0;
   days.forEach(daySelected => {
     if (daySelected.name === day) {
      daySelected.appointments.forEach(id => {
         if (appointments[id].interview) {
           bookedAppointments++;
         }
       })
     }
   })
   return 5 - bookedAppointments;
 };

  function cancelInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = state.days.map(day => {
        if (state.day === day.name) {
          day.spots = spotsRemaining(state.day, state.days, appointments);
        } 
          return day;
      })

     return axios.delete(`/api/appointments/${appointment.id}`)
      .then((response) => {
        setState({...state, appointments, days});
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

      const days = state.days.map(day => {
        if (state.day === day.name) {
          day.spots = spotsRemaining(state.day, state.days, appointments);
        }
         // return day;
        
      })
      return axios.put(`/api/appointments/${appointment.id}`, appointment )
      .then((response) => {
        setState({...state, appointments, days});
      })
    };

    return {  
      state, 
      setDay,
      bookInterview,
      cancelInterview
       }
}

