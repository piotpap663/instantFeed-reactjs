import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth';
import { logoutUser } from '../../services/api';
import styles from './Header.module.scss';

const Header = ({ userId, logoutUserFromState, isAuthenticated }) => (
  <div className={styles.wrapper}>
    <div className={styles.con}>
      <Link to='/'>
        <button>Home</button>
      </Link>
      <Link to='/addPost'>
        <button>Dodaj post</button>
      </Link>
      <Link to='/explore'>
        <button>Odkryj</button>
      </Link>
      <Link to={`/user/${userId}`}>
        <button>Moje</button>
      </Link>
      {isAuthenticated ?
        <Link to="/login" onClick={() => { logoutUser().then(() => { logoutUserFromState(); }); }} ><button>Wyloguj</button></Link> :
        <Link to="/login"><button>Zaloguj</button></Link>
      }
    </div>
  </div>
)
const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
    isAuthenticated: !!state.auth.user
  };
}

const mapDispatchToProps = dispatch => ({
  logoutUserFromState: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

