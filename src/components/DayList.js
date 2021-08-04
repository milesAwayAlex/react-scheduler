import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  return (
    <ul>
      {props.days.map(({ id, name, spots }) => (
        <DayListItem
          key={id}
          name={name}
          spots={spots}
          selected={name === props.value}
          setValue={() => props.setValue(name)}
        />
      ))}
    </ul>
  );
}
