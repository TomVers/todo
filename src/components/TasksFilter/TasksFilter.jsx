import React, { Component } from 'react';
import './TasksFilter.css';

export default class TasksFilter extends Component {

      buttons = [
            { name: 'all', label: 'All' },
            { name: 'active', label: 'Active' },
            { name: 'completed', label: 'Completed' }
      ]

      render() {

            const { filter, onFilterChange } = this.props;

            const buttons = this.buttons.map(({ name, label }) => {
                  const isActive = filter === name;
                  const clazz = isActive ? 'taskfilter_btn--select' : 'taskfilter_btn--noselect';
                  return (
                        <li key = { name } >
                              <button type = 'button'
                              className = { `taskfilter_btn ${clazz}` } 
                              onClick = {() => onFilterChange(name)}>
                                    { label }
                              </button>
                        </li>
                  );
            });

            return (
                  <ul className="taskfilter">
                        { buttons }
                  </ul>
            );
      }
}