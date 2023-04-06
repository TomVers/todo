import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTask('Do sports', 5),
      this.createTask('To do App', 11),
      this.createTask('Relax at home', 671),
    ],
    term: '',
    filter: 'all', // all, active, completed
  }

  createTask(label, taskTime) {
    return {
      label,
      taskTime,
      done: false,
      id: this.maxId++,
    }
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const [...copyArray] = todoData
      copyArray.splice(idx, 1)

      return {
        todoData: copyArray,
      }
    })
  }

  addTask = (text, taskTime) => {
    text = text.trim()
    if (text.length < 1) {
      return
    }
    const newItem = {
      label: text,
      id: this.maxId++,
      taskTime: taskTime,
    }

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]

      return {
        todoData: newArray,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      //1. update object
      const oldTask = todoData[idx]
      const newTask = { ...oldTask, completed: !oldTask.completed }

      // 2. construct new array
      const newArray = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  search(tasks, term) {
    if (term === 0) {
      return tasks
    }
    return tasks.filter((task) => {
      return task.label.indexOf(term) > -1
    })
  }

  filter(tasks, filter) {
    switch (filter) {
      case 'all':
        return tasks
      case 'active':
        return tasks.filter((task) => !task.completed)
      case 'completed':
        return tasks.filter((task) => task.completed)
      default:
        return tasks
    }
  }

  onClearCompleted = () => {
    this.setState((state) => ({
      todoData: state.todoData.filter((task) => !task.completed),
    }))
  }

  render() {
    const { todoData, term, filter } = this.state

    const visibleTasks = this.filter(this.search(todoData, term), filter)

    const completedCount = this.state.todoData.filter((el) => el.completed).length

    const tasksLeft = this.state.todoData.length - completedCount

    return (
      <div className="app">
        <h1 className="app-header">todos</h1>
        <NewTaskForm onTaskAdded={this.addTask} />
        <TaskList
          todos={visibleTasks}
          onDeleted={this.deleteTask}
          onToggleCompleted={this.onToggleCompleted}
        />
        <Footer
          tasksLeft={tasksLeft}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onClearCompleted={this.onClearCompleted}
        />
      </div>
    )
  }
}
