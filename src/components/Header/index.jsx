import React from 'react';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Todos</h1>
      <button>Add todo</button>
    </div>
  );
};
