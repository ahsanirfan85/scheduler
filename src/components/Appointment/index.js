import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Confirm from "components/Appointment/Confirm.js"
import Error from "components/Appointment/Error.js"
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // calling the useVisualMode hook and setting it so that if there is an interview scheduled for that appointment block, it displays, otherwise the appointment block will be shown as empty
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // function that defines app behavior when user clicks on the 'save' button when booking an interview or editing a booking
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // calls the transition function to allow display to show a 'saving' symbol/icon
    transition(SAVING);

    
    props
    .bookInterview(props.id, interview) // calls the bookInterview function to make an Axios PUT request to make a new booking or save an edited booking and save the data to the database
    .then(() => transition(SHOW)) // upon successful completion, it transitions to the mode where the interview details are shown in the appointment block
    .catch((error) => transition(ERROR_SAVE, true)) // shows an error if something goes wrong
  };

  // function that defines app behavior when user clicks on the 'delete' button when editing an interview
  function destroy() {

    // calls the transition function to show the 'deleting' symbol/icon
    transition(DELETING, true);

    props
    .cancelInterview(props.id) // calls the cancelInterview function to make an Axios DELETE request to delete the selected booking
    .then(() => transition(EMPTY)) // upon successful completition, it transitions to the mode where the appointment block is empty
    .catch((error) => transition(ERROR_DELETE, true))
  }

  return (<article className="appointment">

    <Header time={props.time}/> {/*shows the time for every appointment block*/}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />} {/* When the mode is empty, appointment shows as empty and gives user the ability to make an appointment */}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(CONFIRM)}
      />
    )} {/* when the mode is 'show' then the appointment block shows the interview booked for it and gives the user the ability to edit or delete the appointment*/}
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
    )} {/* when the mode is 'create' the nthe appointment block shows a form that the user can use to enter the interview details*/}
    {mode === SAVING && (
      <Status message={SAVING}/>
    )} {/*mode to show the 'saving' symbol/icon*/}
    {mode === DELETING && (
      <Status message={DELETING}/>
    )} {/*mode to show the 'deleting' symbol/icon*/}
    {mode === CONFIRM && (
      <Confirm
        message={`Are you sure you would like to delete?`}
        onCancel={back}
        onConfirm={destroy}
      />
    )}  {/*when mode is 'confirm', the appointment block shows a confirmation screen asking user confirm if they want to delete the appointment*/}
    {mode === EDIT && (
      <Form
        interviewers={props.interviewers}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onCancel={back}
        onSave={save}
      />
    )}  {/*'edit' mode to show form with interview details already entered when user wants to edit an appointment*/}
    {mode === ERROR_DELETE && (
      <Error
        message={`Could not cancel appointment`}
        onClose={back}
      />
    )}  {/*mode to show an error that might occur while deleting the appointment*/}
    {mode === ERROR_SAVE && (
      <Error
        message={`Could not save appointment`}
        onClose={back}
      />
    )}  {/*mode to show an error that might occur while saving the appointment*/}
  </article>);
}