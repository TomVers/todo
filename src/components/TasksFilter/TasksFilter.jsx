import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'all',
    onFilterChange: () => {},
  }

  static propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
  }

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const { filter, onFilterChange } = this.props

    const buttons = this.buttons.map(({ name, label }) => {
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

    return <ul className="taskfilter">{buttons}</ul>
  }
}
