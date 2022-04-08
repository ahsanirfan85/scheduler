import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

// function that displays a single day in the list of days on the page
export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {" day-list__item--selected": props.selected, " day-list__item--full": (!props.spots)});
  
  const formatSpots = function(number) {
    if (number > 1) {
      return `${number} spots remaining`
    }

    if (number === 1) {
      return '1 spot remaining'
    }

    if (number === 0) {
      return 'no spots remaining'
    }
  }
  
  return (
    <li data-testid="day" onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}