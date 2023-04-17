import React from 'react';

import { CardBody } from './CardBody';
import { CardHeader } from './CardHeader';

import styles from './Card.module.scss';

export const Card = ({ item, isDragging }) => {
  const { title, description, files } = item;
  return (
    <div className={isDragging ? `${styles.card} ${styles.dragging}` : styles.card}>
      <CardHeader title={title} description={description} />
      <CardBody files={files} />
    </div>
  );
};
