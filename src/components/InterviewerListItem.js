import React from 'react';
import classnames from 'classnames';

import 'components/InterviewerListItem.scss';

export default function InterviwerListItem(props) {
  const cls = classnames({
    interviewers__item: true,
    'interviewers__item--selected': !!props.selected,
  });
  const imgCls = classnames({
    'interviewers__item-image': true,
    'interviewers__item--selected-image': !!props.selected,
  });
  return (
    <li className={cls}>
      <img
        className={imgCls}
        src={props.avatar}
        alt={props.name}
        onClick={() => {
          props.setInterviewer(props.name);
        }}
      />
      {!!props.selected && props.name}
    </li>
  );
}
