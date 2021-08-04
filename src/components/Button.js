import React from 'react';
import classNames from 'classnames';

import 'components/Button.scss';

export default function Button(props) {
  const { confirm, danger, onClick, disabled } = props;
  const btnCls = classNames({
    button: true,
    'button--confirm': !!confirm,
    'button--danger': !!danger,
  });
  return (
    <button className={btnCls} disabled={!!disabled} onClick={onClick}>
      {props.children}
    </button>
  );
}
