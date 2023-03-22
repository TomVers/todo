import React from 'react';
import Task from '../Task';
import './TaskList.css';

const TaskList = ( { todos, onDeleted, onToggleCompleted } ) => {

  const elements = todos.map((item) => {

    const { id, ...itemProps } = item;

    return (
      <li key = { id } className='todo-list_item'>
        <Task
          { ...itemProps }
        onDeleted = { () => onDeleted(id)}
        onToggleCompleted = { () => onToggleCompleted(id)} />
      </li>
    );
  });

  return (
    <ul className='todo-list'>
      { elements }
    </ul>
  );
}

export default TaskList;