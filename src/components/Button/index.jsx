import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

export const Button = ({ children, className, ...rest }) => {
  return (
    <button className={cn(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};
