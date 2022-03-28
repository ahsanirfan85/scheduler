import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then((response) => {
      transition(SHOW);
    })
    
    
  };

  return (<article className="appointment">

    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={() => {back()}}
        onSave={save}
      />
    )}
    {mode === SAVING && (
      <Status />
    )}
  </article>);
}