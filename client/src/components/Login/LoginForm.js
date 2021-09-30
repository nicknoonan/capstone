import { thisTypeAnnotation } from '@babel/types';
import React from 'react';
class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
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
  handleSubmit(event) {
    alert('login attempt submitted: ' + this.state.username + ' ' + this.state.password);
    event.preventDefault();
  }
  render() {
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
}
export default LoginForm; 