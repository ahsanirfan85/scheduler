import { useState, useEffect } from "react";
import axios from "axios";
import 'dotenv/config'

// This is a custom hook that allows the app to collect data from the database and set it as the 'state' of the app

export default function useApplicationData() {
  // Upon initial render, 'state' is defined as below
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // After initial render, the below gets data from the database server and sets it as the new 'state'
  useEffect(() => {

    // Axios GET request to fetch days, appointments & interviewers
    Promise.all([
      axios.get(process.env.REACT_APP_DAYS_URL),
      axios.get(process.env.REACT_APP_APPOINTMENTS_URL),
      axios.get(process.env.REACT_APP_INTERVIEWERS_URL)
    ]).then((all) => {
      // setState function uses data from the GET request and sets it as the current 'state'
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  // Function to allow user to choose the day they want to view/book/edit appointments
  const setDay = day => setState({ ...state, day });

  // Function to update the 'state' with the spots available after user books/edits/cancel and appointment
  const updateSpots = (state, appointments) => {
    let spots = 0;
    let stateDays = [];
  
    for (let i = 0; i < state.days.length; i++) {
      stateDays.push({});
      stateDays[i] = {...state.days[i]};
    }
      
    for (const day of state.days) {
      if (day.name === state.day) {
        for (const appointment of day.appointments) {
          if (appointments[appointment].interview === null) {
            spots++;
          }
        }
      }
    }
  
    let days = stateDays.map((day) => {
      if (day.name === state.day) {
        day.spots = spots;
      }
      return day;
    });
  
    return days;
  };

  // function to make an Axios PUT request to create a new appointment with the data entered/selected by the user
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      // Upon a successful PUT request, the below updates the 'state' with the user's data
      const appointment = { ...state.appointments[id], interview: { ...interview } };
      const appointments = { ...state.appointments, [id]: appointment };
      const days = updateSpots(state, appointments);
      setState({...state, days, appointments});
    });
  }

  // Function to allow user to cancel an interview, makes an Axios DELETE request
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      // Upon a successful DELETE request, the below updates the 'state' with the cancelation
      const appointment = { ...state.appointments[id], interview: null };
      const appointments = { ...state.appointments, [id]: appointment };
      const days = updateSpots(state, appointments);
      setState({...state, days, appointments});
    });
  }
  return {state, setDay, bookInterview, cancelInterview}
}