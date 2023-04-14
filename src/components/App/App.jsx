import React, { useState } from 'react'
import { nanoid } from 'nanoid'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

export default function App() {
  const createTask = (label, taskTime) => ({
    label,
    taskTime,
    done: false,
    id: nanoid(),
    date: new Date(),
  })
  const [filtered, setFiltered] = useState('all')
  const [todoData, setTodoData] = useState([
    createTask('Do sports', 5),
    createTask('To do App', 11),
    createTask('Relax at home', 671),
  ])
  const filterTask = (tasks, filter) => {
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

  const deleteTask = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const [...copyArray] = todoData
      copyArray.splice(idx, 1)
      return copyArray
    })
  }

  const addTask = (text, taskTime) => {
    text = text.trim()
    if (text.length < 1) {
      return
    }
    const newItem = {
      label: text,
      id: nanoid(),
      date: new Date(),
      taskTime: taskTime,
    }

    setTodoData((todoData) => {
      const newArray = [...todoData, newItem]
      return newArray
    })
  }

  const onToggleCompleted = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[idx]
      const newTask = { ...oldTask, completed: !oldTask.completed }
      const newArray = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
      return newArray
    })
  }

  const onFilterChange = (filter) => {
    setFiltered(filter)
  }

  const onClearCompleted = () => {
    setTodoData((todoData) => {
      return todoData.filter((task) => !task.completed)
    })
  }

  const visibleTasks = filterTask(todoData, filtered)
  const tasksLeft = todoData.filter((el) => !el.completed).length

  return (
    <div className="app">
      <h1 className="app-header">todos</h1>
      <NewTaskForm onTaskAdded={addTask} />
      <TaskList todos={visibleTasks} onDeleted={deleteTask} onToggleCompleted={onToggleCompleted} />
      <Footer
        tasksLeft={tasksLeft}
        filter={filtered}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    </div>
  )
}
