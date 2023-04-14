import React, { useState } from 'react'

import './NewTaskForm.css'

export default function NewTaskForm(props) {
  const { onTaskAdded } = props

  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (label.replace(/\s+/g, '') && min * 60 + +sec > 0) {
      onTaskAdded(label, min * 60 + +sec)
      setLabel('')
      setMin('')
      setSec('')
    }
  }

  const onLabelChange = (event) => {
    setLabel(event.target.value)
  }

  const onMinChange = (event) => {
    setMin(event.target.value)
  }

  const onSecChange = (event) => {
    setSec(event.target.value)
  }

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="label"
        autoFocus
        className="new-task-input"
        placeholder={'Task'}
        onChange={onLabelChange}
        value={label}
      />
      <input
        type="number"
        name="min"
        className="new-task-form__timer"
        placeholder={'Min'}
        min={0}
        onChange={onMinChange}
        value={min}
      />
      <input
        type="number"
        name="sec"
        className="new-task-form__timer"
        placeholder={'Sec'}
        min={0}
        max={60}
        onChange={onSecChange}
        value={sec}
      />
      <button type="submit" style={{ display: 'none' }} />
    </form>
  )
}
