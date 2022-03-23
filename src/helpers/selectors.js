export function getAppointmentsForDay(state, day) {
  const returnArray = []
  for (const each of state.days) {
    if (each.name === day) {
      for (const appointment of each.appointments) {
        returnArray.push(state.appointments[appointment]);
      }
    }
  }
  return returnArray;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const returnObject = {};
  returnObject.student = interview.student;
  returnObject.interviewer = {};
  returnObject.interviewer.id = interview.interviewer;
  returnObject.interviewer.name = state.interviewers[interview.interviewer].name;
  returnObject.interviewer.avatar = state.interviewers[interview.interviewer].avatar;
  return returnObject;
}

export function getInterviewersForDay(state, day) {
  const returnArray = []
  console.log(state);
  console.log(day);
  for (const each of state.days) {
    if (each.name === day) {
      console.log(each.appointments);
      for (const appointment of each.appointments) {
        console.log(state.appointments[appointment]);
        if (state.appointments[appointment].interview) {
          console.log(state.appointments[appointment].interview.interviewer);
          if (!returnArray.includes(state.interviewers[state.appointments[appointment].interview.interviewer])) {
            returnArray.push(state.interviewers[state.appointments[appointment].interview.interviewer]);
          }
          
        }
      }
    }
  }
  console.log(returnArray);
  return returnArray;
}