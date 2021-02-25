import { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';
import firebase, { auth } from './firebase.js';
import Header from './components/Header';
import TaskBrowser from './components/TaskBrowser';
import Modal from './components/Modal';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [modalStatus, setModalStatus] = useState(null); // editingTask|newTask
  const [isLoading, setIsLoading] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const tasksRef = firebase.database().ref('tasks');
    const usersRef = firebase.database().ref('users');
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const usersRef = firebase.database().ref('users/' + user.uid);
        usersRef.set({
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
    });
    tasksRef.on('value', (snapshot) => {
      let tasks = snapshot.val();
      let newState = [];
      for (let task in tasks) {
        newState.push({
          id: task,
          title: tasks[task].title,
          category: tasks[task].category,
          notes: tasks[task].notes,
          userId: tasks[task].userId,
          isCompleted: tasks[task].isCompleted
        });
      }
      setTasks(newState);
      setFilteredTasks(newState);
      setIsLoading(false);
    });
    usersRef.on('value', (snapshot) => {
      let users = snapshot.val();
      setUsers({ users });
    });
  }, []);

  const filterTasks = (filterBy, userId) => {
    let filteredTasks;
    switch (filterBy) {
      case 'incomplete':
        filteredTasks = tasks.filter(task => {
          if (userId) {
            return userId === task.userId && !task.isCompleted;
          }
          return !task.isCompleted;
        });
        break;
        case 'complete':
          filteredTasks = tasks.filter(task => {
          if (userId) {
            return userId === task.userId && task.isCompleted;
          }
          return task.isCompleted;
        });
        break;
      default:
        filteredTasks = userId
          ? tasks.filter(task => task.userId === userId)
          : tasks;
        break;
    }
    setFilteredTasks(filteredTasks);
  }

  return (
    <div className="App">
      <Header user={user} />
      {/* {this.state.isAuthenticated && !this.state.isLoading ? ( */}
      {user && !isLoading ? (
        <>
          <Switch>
            <Route path="/:userId" render={({match:{params}})=> {
              return(
                <TaskBrowser
                  userId={params?.userId}
                  filterTasks={filterTasks}
                  onNewTaskClick={() => setModalStatus("newTask")}
                  user={user}
                  filteredTasks={filteredTasks}
                  users={users}
                />
              )
            }} />
            <Route path="/" render={({match:{params}})=> (
              <TaskBrowser
                userId={params?.userId}
                filterTasks={filterTasks}
                onNewTaskClick={() => setModalStatus("newTask")}
                user={user}
                filteredTasks={filteredTasks}
                users={users}
              />
            )} />
          </Switch>
          <Modal
            user={user}
            status={modalStatus}
            closeModal={() => setModalStatus(null)}
          />
        </>
      ) : (
        <div className="page logged-out">
          <p>Welcome! Login to create/view tasks</p>
          <br/>
          <div className="future-ideas">
            <p>Future ideas:</p>
            <ul>
              <li>View tasks via user id</li>
              <li>Mark tasks as complete/incomplete</li>
              <li>Edit tasks</li>
              <li>Order tasks by priority</li>
              <li>Limit access to teams</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
