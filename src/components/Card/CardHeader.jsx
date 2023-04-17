import React from 'react';

import styles from './CardHeader.module.scss';

export const CardHeader = ({ title, description }) => {
  return (
    <div className={styles.cardHeader}>
      <div>
        <h6 className={styles.title}>{title}</h6>
        <p className={styles.subTitle}>{description}</p>
      </div>
    </div>
  );
};
