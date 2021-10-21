import { useLocation } from 'react-router-dom';
import { React, useState, useEffect } from "react";
import { recover_pass, update_pass } from "../api/Recover";
import { Button } from "react-bootstrap";



function RecoverPassword(props) {
  const [] = useState();
  //const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("nicknoonan86@gmail.com");
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
          Recovery request already sent.
        </>
      );
    }
    else if (badLink) {
      return (
        <>
          invalid password recovery link
        </>
      );
    }
    else {
      return (
        <>
          Unable to submit recovery request.
        </>
      );
    }
  }
  else if (submitting) {
    return (
      <>
        submitting...
      </>
    );
  }
  else if (recoverComplete) {
    return (
      <>
        password recovery email sent.
      </>
    );
  }
  else if (changeComplete) {
    return (
      <>
        your password has been changed successfully.
      </>
    );
  }
  else if (tokenLink) {
    return (
      <form>
        <h3>recover password</h3>
        <label>
          new password:
          <input type="text" value={password} onChange={handlePassword} />
        </label>
        <label>
          confirm password:
          <input type="text" value={confirmPassword} onChange={handleConfirmPassword} />
        </label>
        <Button onClick={handleChangeSubmit}>submit</Button>
      </form>
    );
  }
  else if (!tokenLink) {
    return (
      <form>
        <h3>recover password</h3>
        <label>
          email:
          <input type="text" value={email} onChange={handleEmail} />
        </label>
        <button onClick={handleRecoverSubmit}>submit</button>
      </form>
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