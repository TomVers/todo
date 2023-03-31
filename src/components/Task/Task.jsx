import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditMode: false,
      label: props.label,
      creationTime: Date.now(),
    }
  }

  static defaultProps = {
    onDeleted: () => {},
    onToggleCompleted: () => {},
    completed: false,
  }

  static propTypes = {
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    completed: PropTypes.bool,
  }

  onTaskEdit = () => {
    this.setState((state) => ({
      isEditMode: !state.isEditMode,
    }))
  }

  render() {
    const { label, isEditMode } = this.state
    const { onDeleted, onToggleCompleted, completed } = this.props

    let classNames = 'task'
    if (completed) {
      classNames += ' completed'
    }

    if (isEditMode) {
      return (
        <input
          autoFocus
          className="editing"
          value={label}
          onChange={(e) => {
            this.setState({
              label: e.target.value,
            })
          }}
          onKeyDown={(e) => {
            if (e.key == 'Enter' && e.target.value.trim()) {
              this.setState({
                isEditMode: !isEditMode,
                label: e.target.value.trim(),
              })
            }
          }}
        />
      )
    }

    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted}></input>
        <label className="task-label" onClick={onToggleCompleted}>
          <span className={classNames}> {label} </span>
          <span className="date-created">
            {' '}
            created {formatDistanceToNow(this.state.creationTime, { includeSeconds: true })} ago{' '}
          </span>
        </label>
        <button className="icon icon-edit" onClick={this.onTaskEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    )
  }
}
