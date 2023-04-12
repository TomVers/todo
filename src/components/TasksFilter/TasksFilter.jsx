import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default function TasksFilter(props) {
  const { filter, onFilterChange } = props
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const btn = buttons.map(({ name, label }) => {
    const isActive = filter === name
    const clazz = isActive ? 'taskfilter_btn--select' : 'taskfilter_btn--noselect'
    return (
      <li key={name}>
        <label className={`taskfilter_btn ${clazz}`}>
          {label}
          <input
            type="radio"
            className="taskfilter_input"
            checked={isActive}
            readOnly
            onClick={() => onFilterChange(name)}
          ></input>
        </label>
      </li>
    )
  })

  return <ul className="taskfilter">{btn}</ul>
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
}
