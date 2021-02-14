import { Component } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import firebase, { auth, provider } from './firebase.js';
import Header from './components/Header';
import TaskBrowser from './components/TaskBrowser';
import Modal from './components/Modal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      taskTitle: '',
      taskCategory: '',
      taskNotes: '',
      tasks: [],
      filteredTasks: [],
      users: {},
      user: null,
      filterBy: 'all',
      modalStatus: null, // editingTask|newTask
      isLoading: false,
      isAuthenticated: false,
    }
  }

  componentDidMount() {
    this.setState({isLoading: true})
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user, isAuthenticated: true });
      } 
    });
    const tasksRef = firebase.database().ref('tasks');
    const usersRef = firebase.database().ref('users');
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
      this.setState({
        tasks: newState,
        filteredTasks: newState,
        isLoading: false
      });
    });
    usersRef.on('value', (snapshot) => {
      let users = snapshot.val();
      this.setState({ users });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  
  login = () => {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        }, () => {
          const usersRef = firebase.database().ref('users/' + this.state.user.uid);
          usersRef.set({
            displayName: this.state.user.displayName,
            photoURL: this.state.user.photoURL,
          });
        });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const tasksRef = firebase.database().ref('tasks');
    const task = {
      title: this.state.taskTitle,
      category: this.state.taskCategory,
      notes: this.state.taskNotes,
      userId: this.state.user.uid,
      isCompleted: false,
    }
    tasksRef.push(task);
    this.setState({
      taskTitle: '',
      taskCategory: '',
      taskNotes: '',
      modalStatus: null,
    });
  }

  removeTask = (taskId) => {
    if (window.confirm("Are you sure you want to task this record? This cannot be reverted.")) {
      const taskRef = firebase.database().ref(`/tasks/${taskId}`);
      taskRef.remove();
    }
  }

  filterTasks = (option, userId) => {
    let filteredTasks;
console.log(option, userId, this.state.tasks);
    switch (option) {
      case 'incomplete':
        filteredTasks = this.state.tasks.filter(task => {
          if (userId) {
            console.log('here 1')
            return userId === task.userId && !task.isCompleted;
          }
          console.log('here 2')
          return !task.isCompleted;
        });
        break;
        case 'complete':
          filteredTasks = this.state.tasks.filter(task => {
          if (userId) {
            console.log('here 3')
            return userId === task.userId && task.isCompleted;
          }
          console.log('here 4')
          return task.isCompleted;
        });
        break;
      default:
        console.log('here 5')
        filteredTasks = userId
          ? this.state.tasks.filter(task => task.userId === userId)
          : this.state.tasks;
        break;
    }
    console.log('filteredTasks', filteredTasks);
    this.setState({
      filterBy: option,
      filteredTasks
    });
  }

  render() {
    return (
      <div className="App">
        <Header
          user={this.state.user}
          login={this.login}
          logout={this.logout}
        />
        {this.state.isAuthenticated && !this.state.isLoading ? (
          <>
            <Switch>
              <Route path="/:userId" render={({match:{params}})=> {
                return(
                <TaskBrowser
                  userId={params?.userId}
                  filterTasks={this.filterTasks}
                  onNewTaskClick={() => this.setState({ modalStatus: "newTask" })}
                  user={this.state.user}
                  filteredTasks={this.state.filteredTasks}
                  users={this.state.users}
                  removeTask={this.removeTask}
                />
              )}} />
              <Route path="/" render={({match:{params}})=> (
                <TaskBrowser
                  userId={params?.userId}
                  filterTasks={this.filterTasks}
                  onNewTaskClick={() => this.setState({ modalStatus: "newTask" })}
                  user={this.state.user}
                  filteredTasks={this.state.filteredTasks}
                  users={this.state.users}
                  removeTask={this.removeTask}
                />
              )} />
            </Switch>
            <Modal
              status={this.state.modalStatus}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              taskTitle={this.state.taskTitle}
              taskCategory={this.state.taskCategory}
              taskNotes={this.state.taskNotes}
              closeModal={() => this.setState({ modalStatus: null })}
            />
          </>
        ) : (
          <div className="page logged-out">
            <p>Welcome! Login to create/view tasks</p>
            <button className="primary" onClick={this.login}>Login</button>
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
}

export default App;
