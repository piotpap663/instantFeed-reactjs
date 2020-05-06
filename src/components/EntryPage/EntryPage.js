import React from 'react';
import { connect } from 'react-redux';

import { login } from '../../actions/auth';
import { history } from '../../routers/AppRouter';
import { loginUser, registerUser } from '../../services/api';
import styles from './EntryPage.module.scss';

class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      showLoginPage: true
    };
  }

  handleChangeName = event => {
    this.setState({ user: event.target.value });
  };
  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  switchToLoginOrRegister = () => {
    this.setState((prevState) => {
      return {
        showLoginPage: !prevState.showLoginPage
      }
    })
  };

  handleLogin = e => {
    e.preventDefault();
    const { user, password = 'USER' } = e.target;
    if (user.value && password.value) {
      loginUser(user.value, password.value).then(response => {
        if (response.data.info) {
          alert(response.data.info);
        } else {
          this.props.userLoggedIn(
            response.data.user,
            response.data._id,
            response.data.permission,
            response.data.subscribers
          );
          history.push('/');
        }
      }).catch(function (error) {
        console.error(error);
        alert('Something went wrong');
      });
    } else {
      alert('Fill in fields');
    }
  };
  handleRegister = e => {
    e.preventDefault();
    const { user, password } = this.state;
    if (user && password) {
      registerUser(user, password)
        .then(response => {
          if (response.data.info) {
            alert(response.data.info);
          } else {
            alert(`Registered user: ${user}`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('Fill in fields');
    }
  };

  render() {
    return (
      <div className={styles.entryPage}>
        <button className={styles.button} onClick={this.switchToLoginOrRegister}>
          {this.state.showLoginPage ? "Załóż konto" : "Logowanie"}
        </button>
        <form className={styles.form} onSubmit={this.state.showLoginPage ? this.handleLogin : this.handleRegister}>
          <div className={styles.loginForm}>

            <label>Username:</label>
            <input
              type="text"
              name="user"
              value={this.state.name}
              onChange={this.handleChangeName}
            />
          </div>

          <div className={styles.loginForm}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </div>
          <button className={styles.login} type="submit">
            {this.state.showLoginPage ? "Zaloguj" : "Zarejestruj"}
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userLoggedIn: (user, id, permission, subscribers) => dispatch(login(user, id, permission, subscribers))
});

export default connect(
  undefined,
  mapDispatchToProps
)(EntryPage);
