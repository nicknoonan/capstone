import { thisTypeAnnotation } from '@babel/types';
import { login_user } from '../../api/User'
import { UserContext } from "../../context/Store";

import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Nav, Row, Col, Container
} from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import '../../App.css';
class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: true,
      authenticating: false,
      user: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleClear = this.handleClear.bind(this);
    
  }
  componentDidMount() {
    let [user] = this.context;
    console.log(user);
    if (user) {
      this.setState({user});
      this.setState({loading:false});
    }
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
  }
  handleSubmit(event) {
    this.setState({authenticating: true});
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
        this.setState({authenticating: true});
        localStorage.setItem('user',JSON.stringify(user));
        window.location = '/';
      })
      .catch((err) => {
        this.setState({authenticating: true});
        console.log(err);
        alert('error. please try again later.');
      });
    
    event.preventDefault();
  }
  render() {
    let [user] = this.context;
    if (user.auth === true) {
      window.location = '/';
    }
    if (this.state.loading) {
      return (
        <>
          loading...
        </>
      );
    }
    else if (user.auth) {
      return (
        <>
        already logged in redirecting home...
        </>
      )
    }
    else if (this.state.authenticating) {
      return(
        <div>
          authenticating...
        </div>
      );
    }
    else if (!this.state.user.auth) {
      return(

        <div>
          <Box>
              <Row>
                  <Col>
                      <Box sx={{margin:30}}><h2 className='Pageheader1'>Sign In</h2></Box>
                      <Box
                        sx={{
                          bgcolor: 'rgb(238,238,228)',
                          boxShadow: 1,
                          borderRadius: 1,
                          p: 2,
                          minWidth: 'justify',
                          margin: 30,
                        }}
                      >
                          {/* Sign in Box */}

                          <h4 className='SignInText'>Email</h4>
                              <label>
                                <input className="field" type="text" value={this.state.username} onChange={this.handleUsername} />
                              </label>

                          <form onSubmit={this.handleSubmit}>

                            <h4 className='SignInText'>Password</h4>
                                <label>
                                <input className="field" type="password" value={this.state.password} onChange={this.handlePassword} />
                                </label>
                                <h1></h1>
                                <input className='button' type="submit" value="Login"/>
                                <h1></h1>
                                <a href='recover'>forget your password?</a>


                          </form>

                      </Box>
                  </Col>

                  <Col>
                      <Box sx={{margin:30}}>
                          {/* Need to make an account? Box */}
                          <h2 className='Pageheader1'>Need an account?</h2>
                          <Box sx={{margin:30}}>
                            <h1 className='accountDesc'>Create an account so you can post reviews about housing agencies, rental properties, and rental units that you have experience renting from.</h1>
                            <Nav.Link href='signup'><input className='button' type="submit" value="Sign Up" /></Nav.Link>
                          </Box>
                      </Box>
                  </Col>
              </Row>
          </Box>
        </div>
      );
    }  
    else if (this.state.user.auth) {
      return(
        <>
        redirecting home.
        </>
      );
    }
    else {
      return (
        <>
        oops an error occured.
        </>
      );
    }
  }
}
LoginForm.contextType = UserContext;

export default LoginForm; 