import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Footer.css';
import TasksFilter from '../TasksFilter';

export default class Footer extends Component {
     
      static defaultProps = {
            tasksLeft: 0,
            filter: 'all',
            onFilterChange: () => {},
            onClearCompleted: () => {},
      }

      static propTypes = {
            tasksLeft: PropTypes.number,
            filter: PropTypes.string,
            onFilterChange: PropTypes.func,
            onClearCompleted: PropTypes.func,
      }

      render() {
            const { tasksLeft, filter, onFilterChange, onClearCompleted } = this.props;

            return (
                  <footer className='footer'>
                        <span className='task-count'>{ tasksLeft } items left</span>
                        <TasksFilter
                              filter = { filter }
                              onFilterChange = { onFilterChange }/>
                        <button className="clear-completed"
                              onClick = { onClearCompleted } >Clear completed</button>
                  </footer>
            );
      }
}