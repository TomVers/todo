import React, { Component } from 'react';
import "./NewTaskForm.css"

export default class NewTaskForm extends Component {
  
  state = {
    label: ''
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onTaskAdded(this.state.label);
    this.setState({
      label: ''
    });
  }

  render() {
    return <form className="new-task-form"
      onSubmit = { this.onSubmit } >
      <input type = 'text'
      autoFocus
      className="new-task-input"
      placeholder = { 'What needs to be done?' }
      onChange = { this.onLabelChange }
      value = {this.state.label} >
      </input>
    </form>
  }
}
