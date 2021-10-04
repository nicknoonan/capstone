import { thisTypeAnnotation } from '@babel/types';
import { login_user, get_user } from '../../api/User'
import React from 'react';
import Button from 'react-bootstrap/Button';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'nicknoonan86@gmail.com',
      password: '',
      isAuth: false,
      isSessionAuth: false,
      isWaiting: false,
      loading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  componentDidMount() {
    let localuser;
    try {
      localuser = JSON.parse(localStorage.getItem('user'));
    }
    catch (err) {
      console.log(err);
      return;
    }
    if (localuser) {
      get_user(localuser.id, localuser.token)
      .then((res) => {
        if (res.data._id) {
          this.setState({loading:false});
          this.setState({isSessionAuth: true});
          this.setState({isAuth: true});
          setTimeout(() => {
            window.location = '/';
          }, 1500);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        this.setState({loading:false});
      });
    }
    this.setState({loading:false});
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleUsername(event) {
    this.setState({username: event.target.value});
  }
  handlePassword(event) {
    this.setState({password: event.target.value});
  }
  handleClear(event) {
    console.log('clear!');
    localStorage.setItem('user','');
    this.setState({isAuth: false});
    this.setState({isSessionAuth: false});
  }
  handleSubmit(event) {
    this.setState({isWaiting: true});
    //alert('login attempt submitted: ' + this.state.username + ' ' + this.state.password);
    login_user(this.state.username, this.state.password)
      .then((res) => {
        //store token and user object to local storage
        //console.log('login response:');
        const user = {
          token: res.token,
          id: res.user.id,
          name: res.user.name,
          email: res.user.email
        };
        //console.log(user);
        localStorage.setItem('user',JSON.stringify(user));
        this.setState({isAuth: true});
        this.setState({isWaiting: false});
        setTimeout(() => {
          if (this.state.isAuth) { window.location = '/' };
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        alert('error. please try again later.');
        this.setState({isWaiting: false});
      });
    
    event.preventDefault();
  }
  render() {
    if (this.state.loading) {
      return (
        <>
          loading...
        </>
      );
    }
    else if (this.state.isWaiting) {
      return(
        <div>
          authenticating...
        </div>
      );
    }
    else if (!this.state.isAuth) {
      return(
        <div>
          <h2>login form</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              username:
              <input type="text" value={this.state.username} onChange={this.handleUsername} />
            </label>
            <label>
              password:
              <input type="password" value={this.state.password} onChange={this.handlePassword} />
            </label>
            <input type="submit" value="Login" />
          </form>
        </div>
      );
    }
    else if (!this.state.isSessionAuth) {
      return(
        <div>
          login successful redirecting to home...
          <button onClick={this.handleClear}>
            clear
          </button>
        </div>
      );
    }
    else {
      return(
        <div>
          already logged in redirecting to home...
          <button onClick={this.handleClear}>
            clear
          </button>
        </div>
      );
    }
  }
}

export default LoginForm; 