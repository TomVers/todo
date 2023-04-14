import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

export default function Task(props) {
  const { label, date, taskTime, onDeleted, onToggleCompleted, completed } = props
  const [isEditMode, setEditMode] = useState(false)
  const [name, setName] = useState(label)
  const [stop, setStop] = useState(false)
  const [timerId, setTimerId] = useState(null)
  const [tasktime, setTaskTime] = useState(0)

  const onTaskEdit = () => {
    setEditMode((el) => !el)
  }

  const onTimerClick = () => {
    setStop(!stop)
  }

  useEffect(() => {
    setTaskTime(taskTime)
    setStop(true)
  }, [taskTime])

  useEffect(() => {
    if (stop) {
      clearInterval(timerId)
    } else {
      clearInterval(timerId)

      const timer = setInterval(() => {
        setTaskTime((prevTasktime) => {
          if (!stop && prevTasktime > 0) {
            return prevTasktime - 1
          }
          return prevTasktime
        })
      }, 1000)

      setTimerId(timer)
    }
  }, [stop])

  let classNames = 'task'
  if (completed) {
    classNames += ' completed'
  }

  if (isEditMode) {
    return (
      <input
        autoFocus
        className="editing"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key == 'Enter' && event.target.value.trim()) {
            setEditMode((el) => !el)
            setName(event.target.value.trim())
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
        <span className={classNames}> {name} </span>
        <span className="inform">
          <button
            className={timerbtn}
            onClick={(e) => {
              onTimerClick()
              e.stopPropagation()
            }}
          ></button>
          <span>{`${minutes >= 10 ? minutes : `0${minutes}`}:${
            seconds >= 10 ? seconds : `0${seconds}`
          }`}</span>
        </span>
        <span className="date-created">
          created {formatDistanceToNow(date, { includeSeconds: true })} ago
        </span>
      </label>
      <button className="icon icon-edit" onClick={onTaskEdit}></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  )
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  completed: false,
}

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  completed: PropTypes.bool,
}
