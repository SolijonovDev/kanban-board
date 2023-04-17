import React from 'react';

import { ReactComponent as FileSVG } from '../../assets/file.svg';
import styles from './CardBody.module.scss';

export const CardBody = props => {
  const { files } = props;
  return (
    <span className={styles.cardBody}>
      <span className={styles.svgFile}>
        <FileSVG />
      </span>
      <span>{files}</span>
    </span>
  );
};
