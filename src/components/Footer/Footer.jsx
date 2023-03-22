import React, { Component } from 'react';
import './Footer.css';
import TasksFilter from '../TasksFilter';

export default class Footer extends Component {
     
      render() {
            const { task, filter, onFilterChange, onClearCompleted } = this.props;

            return (
                  <footer className='footer'>
                        <span className='task-count'>{ task } items left</span>
                        <TasksFilter
                              filter = { filter }
                              onFilterChange = { onFilterChange }/>
                        <button className="clear-completed"
                              onClick = { onClearCompleted } >Clear completed</button>
                  </footer>
            );
      }
}