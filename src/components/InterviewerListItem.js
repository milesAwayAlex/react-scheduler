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
    <li className={cls} onClick={props.setItem}>
      <img className={imgCls} src={props.avatar} alt={props.name} />
      {!!props.selected && props.name}
    </li>
  );
}
