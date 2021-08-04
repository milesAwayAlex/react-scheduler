import React from 'react';
import classnames from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const tellSpots = (spots) => {
    if (spots <= 0) return 'no spots remaining';
    if (spots === 1) return spots + ' spot remaining';
    return spots + ' spots remaining';
  };
  const cls = classnames({
    'day-list__item': true,
    'day-list__item--selected': !!props.selected,
    'day-list__item--full': props.spots === 0,
  });
  return (
    <li className={cls} onClick={props.setValue}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{tellSpots(props.spots)}</h3>
    </li>
  );
}
