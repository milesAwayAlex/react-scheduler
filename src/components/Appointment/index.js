import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const i = props.interview;
  return (
    <article className="appointment">
      <Header time={props.time} />
      {i ? <Show student={i.student} interviewer={i.interviewer} /> : <Empty />}
    </article>
  );
}
