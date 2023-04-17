import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Card } from '../Card';

import { ReactComponent as AddFilesSVG } from '../../assets/add-files.svg';
import styles from './Column.module.scss';

export const Column = props => {
  const { title, items, droppableId } = props;
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h4>
          {title} {items?.length}
        </h4>
      </div>
      <Droppable droppableId={droppableId}>
        {provided => (
          <div className={styles.columnBody} {...provided.droppableProps} ref={provided.innerRef}>
            {!items?.length && (
              <div className={styles.emptyColumn}>
                <AddFilesSVG />
              </div>
            )}
            {items?.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.item}
                  >
                    <Card key={item.id} item={item} isDragging={snapshot.isDragging} />
                  </div>
                )}
              </Draggable>
            ))}
            <div className={styles.item}>{provided.placeholder}</div>
          </div>
        )}
      </Droppable>
    </div>
  );
};
