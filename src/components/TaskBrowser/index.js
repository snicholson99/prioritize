import { useEffect } from 'react';

import TaskBar from '../TaskBar';
import Tasks from '../Tasks';

const TaskBrowser = (props) => {
  const {
    filterTasks,
    onNewTaskClick,
    user,
    users,
    userId,
    filteredTasks,
    removeTask,
  } = props;

  useEffect(() => {
    filterTasks('all', userId);
  }, [filterTasks, userId]);

  return (
    <>
      <TaskBar {...{ userId, filterTasks, onNewTaskClick }}/>
      <Tasks {...{ user, filteredTasks, users, removeTask }}/>
    </>
  );

}

export default TaskBrowser;