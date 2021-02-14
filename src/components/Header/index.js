import { Link } from 'react-router-dom';

import './style.css';

const Header = (props) => {
  const { user, login, logout } = props;
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
