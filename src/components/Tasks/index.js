import './style.css';


const Tasks = (props) => {
  const { user, filteredTasks, users, removeTask } = props;
  return (
    <div className="page">
      <div className="tasks">
        {filteredTasks.map(task => {
          return (
            <div key={task.id} className="task">
              <div className="task-header">
                <p className="task-title">{task.title}</p>
                {!!task.userId && task.userId === user.uid && (
                  <div>
                    <button className="warning" onClick={() => alert('sorry, editing tasks coming soon!')}>
                      <i className="fas fa-edit" />
                    </button>
                    <button className="danger" onClick={() => removeTask(task.id)}>
                      <i className="fas fa-trash" />
                    </button>
                    {/* <button onClick={() => toggleCompleted(task.id)}>Incomplete</button> */}
                  </div>
                )}
              </div>
              <p>{task.isCompleted ? "Completed" : "Incomplete"}</p>
              {task.remaining_hours_estimate && task.full_hours_estimate && (
                <p>{task.remaining_hours_estimate ? task.remaining_hours_estimate : 0}/{task.full_hours_estimate ? task.full_hours_estimate : 0} hrs remaining</p>
              )}
              <small>{task.notes}</small>
              <p className="task-category">{task.category}</p>
              <div className="task-author-container">
                <p>{users[task.userId]?.displayName}</p>
                <img src={users[task.userId]?.photoURL} alt="" />
              </div>
              <div className="task-footer"></div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Tasks;