import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const days = props.days.map((dayOfTheWeek) => {
    return (
      <DayListItem 
        key={dayOfTheWeek.id}
        name={dayOfTheWeek.name} 
        spots={dayOfTheWeek.spots} 
        selected={dayOfTheWeek.name === props.value}
        setDay={props.onChange}
      />
    )
  })

  return (
    <ul>
      {days}
    </ul>
  );
}