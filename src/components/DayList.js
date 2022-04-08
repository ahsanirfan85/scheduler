import React from "react";
import DayListItem from "components/DayListItem";

// function that lists all the days on the page
export default function DayList(props) {

  const days = props.days.map((dayOfTheWeek) => {
    return (
      // each day in the list of days
      <DayListItem 
        key={dayOfTheWeek.id}
        name={dayOfTheWeek.name} 
        spots={dayOfTheWeek.spots} 
        selected={dayOfTheWeek.name === props.value}
        setDay={props.onChange}
        data-testid="day"
      />
    )
  })

  return (
    <ul>
      {days}
    </ul>
  );
}