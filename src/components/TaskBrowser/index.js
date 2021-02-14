import { Component } from 'react';

import TaskBar from '../TaskBar';
import Tasks from '../Tasks';

class TaskBrowser extends Component {
  componentDidMount() {
    this.props.filterTasks('all', this.props.userId);
  }

  render() {
    const {
      filterTasks,
      onNewTaskClick,
      user,
      users,
      userId,
      filteredTasks,
      removeTask,
    } = this.props;

    return (
      <>
        <TaskBar {...{userId, filterTasks, onNewTaskClick}}/>
        <Tasks {...{user, filteredTasks, users, removeTask}}/>
      </>
    );
  }
}

export default TaskBrowser;