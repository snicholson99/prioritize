import { useState } from 'react';
import './style.css';

import firebase from 'firebase';

const Modal = (props) => {
  const { user, status, closeModal } = props;
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskNotes, setTaskNotes] = useState('');

  const createTask = e => {
    e.preventDefault();
    const tasksRef = firebase.database().ref('tasks');
    const task = {
      title: taskTitle,
      category: taskCategory,
      notes: taskNotes,
      userId: user.uid,
      isCompleted: false,
    }
    tasksRef.push(task);
    setTaskTitle('');
    setTaskCategory('');
    setTaskNotes('');
    closeModal();
  }

  if (status === null) return null;
  else if (status === 'newTask') {
    return (
      <form className='Modal' onSubmit={createTask}>
        <div className="Modal-header">
          <p>New Task</p>
          <button className="Modal-close primary" onClick={closeModal}>✕</button>
        </div>
        <div className="Modal-body">
          <input type="text" name="taskTitle" placeholder="Task Title" onChange={(e) => setTaskTitle(e.target.value)} value={taskTitle} />
          <input type="text" name="taskCategory" placeholder="Task Category" onChange={(e) => setTaskCategory(e.target.value)} value={taskCategory} />
          <textarea name="taskNotes" placeholder="Task Notes" onChange={(e) => setTaskNotes(e.target.value)} value={taskNotes} />
        </div>
        <div className="Modal-footer">
          <button className="success">Add Task</button>
        </div>
      </form>
    );
  }
}

export default Modal;