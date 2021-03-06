// function that takes the current 'state' and the user's selected 'day' and returns the appointments for that day
export function getAppointmentsForDay(state, day) {
  const returnArray = []
  let tempArray = []
  for (const each of state.days) {
    if (each.name === day) {
      for (const appointment of each.appointments) {
        tempArray.push(appointment);
      }
    }
  }

  for (const appointment in state.appointments) {
    for (const each of tempArray) {
      if (state.appointments[appointment].id === each) {
        returnArray.push(state.appointments[appointment]);
      }
    }
  }
  return returnArray;
}

// function that returns interview details to the user (if it exists) when the user selects an appointment block
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const returnObject = {};
  returnObject.student = interview.student;
  returnObject.interviewer = {};
  returnObject.interviewer.id = interview.interviewer;
  if (state.interviewers[interview.interviewer]) {
    returnObject.interviewer.name = state.interviewers[interview.interviewer].name;
    returnObject.interviewer.avatar = state.interviewers[interview.interviewer].avatar;
  } else {
    returnObject.interviewer.name = "random";
    returnObject.interviewer.avatar = "random";
  }
  
  
  return returnObject;
}

// function to allow user to see all the interviews for the day when they select a day
export function getInterviewersForDay(state, day) {
  const returnArray = []
  let tempArray = []
  for (const each of state.days) {
    if (each.name === day) {
      for (const interviewer of each.interviewers) {
        tempArray.push(interviewer);
      }
    }
  }

  for (const interviewer in state.interviewers) {
    for (const each of tempArray) {
      if (state.interviewers[interviewer].id === each) {
        returnArray.push(state.interviewers[interviewer]);
      }
    }
  }
  return returnArray;
}