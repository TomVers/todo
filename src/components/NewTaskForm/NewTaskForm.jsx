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
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onTaskAdded(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form className="new-task-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          autoFocus
          className="new-task-input"
          placeholder={'Task'}
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <input type="number" className="new-task-form__timer" placeholder={'Min'} min={0} max={60} />
        <input type="number" className="new-task-form__timer" placeholder={'Sec'} min={0} max={60} />
      </form>
    )
  }
}
