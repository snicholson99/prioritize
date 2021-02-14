import './style.css';

const Modal = (props) => {
  const { status, taskTitle, taskCategory, taskNotes, handleChange, handleSubmit, closeModal } = props;
  if (status === null) return null;
  else if (status === 'newTask') {
    return (
      <form className='Modal' onSubmit={handleSubmit}>
        <div className="Modal-header">
          <p>New Task</p>
          <button className="Modal-close primary" onClick={closeModal}>✕</button>
        </div>
        <div className="Modal-body">
          <input type="text" name="taskTitle" placeholder="Task Title" onChange={handleChange} value={taskTitle} />
          <input type="text" name="taskCategory" placeholder="Task Category" onChange={handleChange} value={taskCategory} />
          <textarea name="taskNotes" placeholder="Task Notes" onChange={handleChange} value={taskNotes} />
        </div>
        <div className="Modal-footer">
          <button className="success">Add Task</button>
        </div>
      </form>
    );
  }
}

export default Modal;