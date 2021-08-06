import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(props) {
  const i = props.interview;
  const { mode, transition, back } = useVisualMode(i ? SHOW : EMPTY);
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
          onSave={() => transition(SHOW)}
          onCancel={() => transition(EMPTY)}
        />
      )}
    </article>
  );
}
