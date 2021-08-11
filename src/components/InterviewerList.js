import React from 'react';
import InterviwerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

import 'components/InterviewerList.scss';

function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(({ id, name, avatar }) => (
          <InterviwerListItem
            key={id}
            name={name}
            avatar={avatar}
            selected={id === props.value}
            setItem={() => props.setValue(id)}
          />
        ))}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = { interviewers: PropTypes.array.isRequired };

export default InterviewerList;
