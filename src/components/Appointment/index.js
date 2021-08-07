import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const EDIT = 'EDIT';
  const i = props.interview;
  const { mode, transition, back } = useVisualMode(i ? SHOW : EMPTY);
  const save = (student, interviewer) => {
    transition(SAVING);
    props
      .bookInterview(props.id, { student, interviewer })
      .then(() => transition(SHOW));
  };
  const onDelete = () => {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  };
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={i.student}
          interviewer={i.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === EDIT && (
        <Form
          name={i.student}
          interviewer={i.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm onCancel={() => back()} onConfirm={onDelete} />
      )}
    </article>
  );
}
