import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

const TaskList = ({ todos, onDeleted, onToggleCompleted }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <li key={id}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
}

export default TaskList
