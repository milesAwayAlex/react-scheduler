import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const i = props.interview;
  const { mode, transition, back } = useVisualMode(i ? SHOW : EMPTY);
  const save = (student, interviewer) => {
    transition(SAVING);
    props
      .bookInterview(props.id, { student, interviewer })
      .then(() => transition(SHOW));
  };
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={i.student} interviewer={i.interviewer} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
    </article>
  );
}
