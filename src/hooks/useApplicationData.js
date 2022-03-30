import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
  
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const setDay = day => setState({ ...state, day });

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

  function bookInterview(id, interview) {
    console.log(interview);
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      const appointment = { ...state.appointments[id], interview: { ...interview } };
      const appointments = { ...state.appointments, [id]: appointment };
      const days = updateSpots(state, appointments);
      setState({...state, days, appointments});
    });
  }

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = { ...state.appointments[id], interview: null };
      const appointments = { ...state.appointments, [id]: appointment };
      const days = updateSpots(state, appointments);
      setState({...state, days, appointments});
    });
  }
  return {state, setDay, bookInterview, cancelInterview}
}