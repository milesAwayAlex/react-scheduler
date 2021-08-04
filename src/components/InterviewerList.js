import React from 'react';
import InterviwerListItem from 'components/InterviewerListItem';

import 'components/InterviewerList.scss';

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(({ id, name, avatar }) => (
          <InterviwerListItem
            key={id}
            name={name}
            avatar={avatar}
            selected={id === props.interviewer}
            setItem={() => props.setInterviewer(id)}
          />
        ))}
      </ul>
    </section>
  );
}
