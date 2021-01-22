export function getAppointmentsForDay(state, day) {
  const days = state.days
  const appointments = state.appointments;

  const daysFound = days.find(eachDay => eachDay.name === day);
  if (!daysFound) {
    return [];
  }

  const apptsFound = daysFound.appointments.map(oneDay => {
    return appointments[oneDay];
  })

  return apptsFound;
}


export function getInterview(state, interview) {
  const interviewers = state.interviewers;
  if (interview) {
  return { student: interview.student, interviewer: interviewers[interview.interviewer]};
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const days = state.days
  const interviewers = state.interviewers;

  const daysFound = days.find(eachDay => eachDay.name === day);
  if (!daysFound) {
    return [];
  }

  const interviewersFound = daysFound.interviewers.map(oneDay => {
    return interviewers[oneDay];
  })

  return interviewersFound;
}