import { useLocation } from 'react-router-dom';
import { React, useState, useEffect } from "react";
import { recover_pass, update_pass } from "../api/Recover";
import { Button } from "react-bootstrap";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Nav, Row, Col, Container
} from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import '../App.css';
import Aload from '../components/loading/loading';


function RecoverPassword(props) {
  const [] = useState();
  //const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [badLink, setBadLink] = useState(false);

  const [recoverComplete, setRecoverComplete] = useState(false);
  const [changeComplete, setChangeComplete] = useState(false);
  const [tokenLink, setTokenLink] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  //const [token, setToken] = useState("");
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  if (token && tokenLink == false) {
    setTokenLink(true);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value)
  }
  function handleConfirmPassword(event) {
    setConfirmPassword(event.target.value);
  }
  function handleRecoverSubmit(event) {
    setSubmitting(true);
    recover_pass(email).then(function (res) {
      setSubmitting(false);
      setRecoverComplete(true);
    }).catch(function (err) {
      console.log(err);
      if (err.response.status == 409) {
        setConflict(true);
      }
      setError(true);
    })
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function handleChangeSubmit(event) {
    setSubmitting(true);
    //console.log(password);
    //console.log(confirmPassword);
    if (password != confirmPassword) {
      setSubmitting(false);
      alert("passwords must match");
    }
    else {
      update_pass(token, password).then((res) => {
        console.log(res);
        setChangeComplete(true);
        setSubmitting(false);
      }).catch(async (err) => {
        console.log(err);
        await sleep(1500);
        setError(true);
        if (err.response.status == 400) {
          setBadLink(true);
        }
        setSubmitting(false);
      });
    }
  }
  if (error) {
    if (conflict) {
      return (
        <>
          <Box>
          <Row>
            <Col>
              <Box sx={{
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            minWidth: 'justify',
            margin: 30,
            }}>
                <h2 className='boxHeader1'>Recovery request already sent</h2>
              </Box>
            </Col>

            <Col>
            </Col>
          </Row>
        </Box>
        </>
      );
    }
    else if (badLink) {
      return (
        <>
        <Box>
          <Row>
            <Col>
              <Box sx={{
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            minWidth: 'justify',
            margin: 30,
            }}>
                <h2 className='boxHeader1'>Invalid password recovery link</h2>
              </Box>
            </Col>

            <Col>
            </Col>
          </Row>
        </Box>
        </>
      );
    }
    else {
      return (
        <>
        <Box>
          <Row>
            <Col>
              <Box sx={{
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            minWidth: 'justify',
            margin: 30,
            }}>
                <h2 className='boxHeader1'>Unable to submit recovery request</h2>
              </Box>
            </Col>

            <Col>
            </Col>
          </Row>
        </Box>
        </>
      );
    }
  }
  else if (submitting) {
    return (
      <div>
      <h2 className='SignInText' align='center' margin='50'>Submitting...</h2>
      <Aload />
    </div>
    );
  }
  else if (recoverComplete) {
    return (
      <>
        <Box>
          <Row>
            <Col>
              <Box sx={{
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            minWidth: 'justify',
            margin: 30,
            }}>
                <h2 className='boxHeader1'>Password recovery email sent!</h2>
              </Box>
            </Col>

            <Col>
            </Col>
          </Row>
        </Box>
      </>
    );
  }
  else if (changeComplete) {
    return (
      <><Box>
      <Row>
        <Col>
          <Box sx={{
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        minWidth: 'justify',
        margin: 30,
        }}>
            <h2 className='boxHeader1'>Your password has been changed successfully!</h2>
          </Box>
        </Col>

        <Col>
        </Col>
      </Row>
    </Box>
      </>
    );
  }
  else if (tokenLink) {
    return (
      <Box>
        <Row>

          <Col>
            <Box sx={{
            bgcolor: 'rgb(238,238,228)',
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            minWidth: 'justify',
            margin: 30,
            }}>

            <form>
            <h2 className='SignInText'>New Password:</h2>
            <label>
              <input className='field' type="text" value={password} onChange={handlePassword} />
            </label>

            <h2 className='SignInText'>Confirm Password:</h2>
            <label>
              <input className='field' type="text" value={confirmPassword} onChange={handleConfirmPassword} />
            </label>
            <h1></h1>
            <button className='button' onClick={handleChangeSubmit}>Submit</button>
            </form>
            </Box>
          </Col>

          <Col>
          
          </Col>

        </Row>
      </Box>
    );
  }
  else if (!tokenLink) {
    return (
      <Box>
        <Row>
          <Col>
            <Box sx={{
            bgcolor: 'rgb(238,238,228)',
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            minWidth: 'justify',
            margin: 30,
            }}>
              <form>
                <h2 className='SignInText'>Recover Password</h2>
                <label className='answerText'>
                Email:
                <input className='field' type="text" value={email} onChange={handleEmail} />
                </label>
                <h1></h1>
                <button className='button' onClick={handleRecoverSubmit}>submit</button>
              </form>
            </Box>
          </Col>

          <Col>
          </Col>

        </Row>
      </Box>
      
    );
  }
  else {
    return (
      <>
      </>
    );
  }
}

export default RecoverPassword;