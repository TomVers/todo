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
      stop: false,
      timerId: null,
      tasktime: 0,
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

  onTimerClick = () => {
    this.setState(({ stop }) => {
      return { stop: !stop }
    })
  }

  componentDidMount() {
    this.setState({ tasktime: this.props.taskTime, stop: true })
  }

  componentDidUpdate(prevProps, prevState) {
    const { stop, timerId } = this.state
    if (stop && !prevState.stop) {
      clearInterval(timerId)
    }
    if (prevState.stop && !stop) {
      clearInterval(timerId)

      const timer = setInterval(() => {
        this.setState(({ tasktime, stop: prevstop }) => {
          if (!prevstop && tasktime > 0) {
            return { timerId: timer, tasktime: tasktime - 1 }
          }
          return { timerId: timer }
        })
      }, 1000)
    }
  }

  render() {
    const { label, isEditMode, stop, tasktime } = this.state
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

    const minutes = Math.trunc(tasktime / 60)
    const seconds = tasktime - minutes * 60
    const timerbtn = stop ? 'start' : 'stop'

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={onToggleCompleted}
        ></input>
        <label className="task-label" onClick={onToggleCompleted}>
          <span className={classNames}> {label} </span>
          <span className="inform">
            <button
              className={timerbtn}
              onClick={(e) => {
                this.onTimerClick()
                e.stopPropagation()
              }}
            ></button>
            <span>{`${minutes >= 10 ? minutes : `0${minutes}`}:${
              seconds >= 10 ? seconds : `0${seconds}`
            }`}</span>
          </span>
          <span className="date-created">
            created {formatDistanceToNow(this.state.creationTime, { includeSeconds: true })} ago
          </span>
        </label>
        <button className="icon icon-edit" onClick={this.onTaskEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    )
  }
}
