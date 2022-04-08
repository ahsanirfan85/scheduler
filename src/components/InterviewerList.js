import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from 'prop-types';

// function that lists the names of interviewers when a user clicks on an empty appointment block
function InterviewerList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      // calling the function that displays each interviewer in the interviewer list
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => {props.onChange(interviewer.id)}}
        selected={interviewer.id === props.value}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;