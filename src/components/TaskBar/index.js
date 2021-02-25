import { useState } from 'react';
import './style.css';

const TaskBar = (props) => {
  const { userId, onNewTaskClick, filterTasks } = props;
  // const [filterBy, setFilterBy] = useState('all');

  const onFilterChange = (value) => {
    filterTasks(value, userId);
    // setFilterBy(value);
  }

  return (
    <div className="TaskBar">
      <div>
        <label htmlFor="filterTasks">Filter By</label>
        <select id="filterTasks" name="filterBy" onChange={(e) => onFilterChange(e.target.value)}>
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
      </div>
      <button className="primary" onClick={onNewTaskClick}>New Task</button>
    </div>
  );
}

export default TaskBar;