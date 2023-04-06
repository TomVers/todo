import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onTaskAdded: () => {},
  }

  static propTypes = {
    onTaskAdded: PropTypes.func,
  }

  state = {
    label: '',
    min: '',
    sec: '',
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { label, min, sec } = this.state
    this.props.onTaskAdded(label, min * 60 + +sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onMinChange = (event) => {
    this.setState({
      min: event.target.value,
    })
  }

  onSecChange = (event) => {
    this.setState({
      sec: event.target.value,
    })
  }

  render() {
    return (
      <form className="new-task-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="label"
          autoFocus
          className="new-task-input"
          placeholder={'Task'}
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <input
          type="number"
          name="min"
          className="new-task-form__timer"
          placeholder={'Min'}
          min={0}
          onChange={this.onMinChange}
          value={this.state.min}
        />
        <input
          type="number"
          name="sec"
          className="new-task-form__timer"
          placeholder={'Sec'}
          min={0}
          max={60}
          onChange={this.onSecChange}
          value={this.state.sec}
        />
        <button type="submit" style={{ display: 'none' }} />
      </form>
    )
  }
}
