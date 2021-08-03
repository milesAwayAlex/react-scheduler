import React from 'react';

import 'components/Button.scss';

export default function Button(props) {
  let btnClass = 'button';
  const { confirm, danger, onClick, disabled } = props;
  if (confirm) {
    btnClass += ' button--confirm';
  }
  if (danger) {
    btnClass += ' button--danger';
  }
  return (
    <button className={btnClass} disabled={!!disabled} onClick={onClick}>
      {props.children}
    </button>
  );
}
