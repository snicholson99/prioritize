import './style.css';

const TaskBar = (props) => {
  const { userId, onNewTaskClick, filterTasks } = props;
  return (
    <div className="TaskBar">
      <div>
        <label htmlFor="filterTasks">Filter By</label>
        <select id="filterTasks" name="filterBy" onChange={(e) => filterTasks(e.target.value, userId)}>
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