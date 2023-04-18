import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useQueryClient } from 'react-query';

import { useTodoContext } from '../../context/TodoProvider';
import { Button } from '../Button';
import { Api } from '../../api/todos-api';

import styles from './AddTodo.module.scss';

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
});

export const AddTodo = () => {
  const { hidePopup } = useTodoContext();
  const { data: todos = {} } = useQuery('get-todos', Api.fetchTodos, { staleTime: Infinity });
  const [status, setStatus] = useState(null);
  const [shouldBlockButton, setShouldBlockButton] = useState(true);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleAddTodo = async values => {
    const id = await uuidv4();
    const { title, description } = values;
    const newTodo = {
      id,
      title,
      description,
    };
    const newTodos = { ...todos, todo: [...todos.todo, newTodo] };

    try {
      await Api.updateTodos(newTodos);
      queryClient.invalidateQueries('get-todos');
      hidePopup();
    } catch (e) {
      alert('Something went wrong!');
    }
  };

  useEffect(() => {
    if (status === 'pending' || !isDirty || !isValid) {
      setShouldBlockButton(true);
    } else {
      setShouldBlockButton(false);
    }
  }, [status, isValid, isDirty]);

  return (
    <div className={styles.addTodo} onClick={hidePopup}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Add todo</h2>
        </div>
        <form onSubmit={handleSubmit(handleAddTodo)} className={styles.form}>
          <input
            autoFocus
            className={cn({
              [styles.error]: errors.title,
            })}
            type="text"
            {...register('title')}
            placeholder="Title"
          />
          {errors.title && <p className={styles.errorText}>Title is required.</p>}
          <input
            className={cn({
              [styles.error]: errors.description,
            })}
            type="text"
            {...register('description')}
            placeholder="Description"
          />
          <label htmlFor="file-input" className={styles.selectFilePanel}>
            <input className={styles.fileInput} id="file-input" type="file" />
            <span>Select a file</span>
          </label>
          <div className={styles.btns}>
            <Button onClick={hidePopup} className={styles.btn}>
              Cancel
            </Button>
            <Button disabled={shouldBlockButton} type="submit" className={styles.btn}>
              {status === 'pending' ? 'Sending ... ' : 'Add'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
