import React from "react";
import LoginForm from "../components/Login/LoginForm";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  componentDidMount() {

  }
  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div>
          <h1>login page</h1>
          <LoginForm/>
        </div>
      );
    }
  }
};

export default Login;