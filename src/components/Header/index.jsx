import React from 'react';

import { useTodoContext } from '../../context/TodoProvider';
import { Button } from '../Button';

import styles from './Header.module.scss';

export const Header = () => {
  const { showPopup } = useTodoContext();
  return (
    <div className={styles.header}>
      <h1>Todos</h1>
      <Button onClick={showPopup}>Add todo</Button>
    </div>
  );
};
