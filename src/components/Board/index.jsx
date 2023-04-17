import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useQuery, useQueryClient } from 'react-query';
import { Column } from '../Column';

import { Api } from '../../api/todos-api';
import { data } from '../../config/columns';
import styles from './Board.module.scss';

export const Board = () => {
  const [columns, setColumns] = useState(data);
  const { data: todos = {} } = useQuery('get-todos', Api.fetchTodos, { staleTime: Infinity });
  const queryClient = useQueryClient();

  const onDragEnd = async result => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (sourceDroppableId !== destinationDroppableId) {
      const sourceItems = todos[sourceDroppableId];
      const destinationItems = todos[destinationDroppableId];
      const [removed] = sourceItems.splice(sourceIndex, 1);
      destinationItems.splice(destinationIndex, 0, removed);

      const newObject = {
        ...todos,
        [sourceDroppableId]: sourceItems,
        [destinationDroppableId]: destinationItems,
      };

      await Api.updateTodos(newObject);
      queryClient.invalidateQueries('get-todos');
    } else {
      const items = todos[destinationDroppableId];
      const [removed] = items.splice(sourceIndex, 1);
      items.splice(destinationIndex, 0, removed);

      const newObject = {
        ...todos,
        [destinationDroppableId]: items,
      };

      await Api.updateTodos(newObject);
      queryClient.invalidateQueries('get-todos');
    }
  };

  return (
    <div className={styles.board}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.taskPanel}>
          {Object.entries(columns).map(([columnKey, column]) => (
            <Column
              key={columnKey}
              title={column.title}
              items={todos[columnKey]}
              droppableId={columnKey}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
