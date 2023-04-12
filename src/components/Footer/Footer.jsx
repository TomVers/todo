import React from 'react'
import PropTypes from 'prop-types'

import './Footer.css'
import TasksFilter from '../TasksFilter/TasksFilter'

export default function Footer(props) {
  const { tasksLeft, filter, onFilterChange, onClearCompleted } = props

  return (
    <footer className="footer">
      <span className="task-count">{tasksLeft} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  tasksLeft: 0,
  onClearCompleted: () => {},
}

Footer.propTypes = {
  tasksLeft: PropTypes.number,
  onClearCompleted: PropTypes.func,
}
