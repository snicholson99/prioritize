import { Link } from 'react-router-dom';

import { auth, provider } from '../../firebase.js';
import './style.css';

const login = () => {
  auth.signInWithPopup(provider)
    // .then((result) => {
    //   const user = result.user;
    //   this.setState({
    //     user
    //   }, () => {

    //   });
    // });
}

const logout = () => {
  auth.signOut()
    // .then(() => {
    //   this.setState({
    //     user: null
    //   });
    // });
}

const Header = (props) => {
  const { user } = props;
  return (
    <header className="Header">
      <Link to="/" className="title">
        <h1><i className="fas fa-tasks"/><span>Prioritize</span></h1>
      </Link>
      <div className="profile-container">
        {user ? (
          <>
            <img src={user.photoURL} alt="Profile avatar." />
            <p onClick={logout}>Logout</p>
          </>
          ) : (
          <p onClick={login}>Login</p>
        )}
      </div>
    </header>
  );
}

export default Header;
