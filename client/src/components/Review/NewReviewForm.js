import { thisTypeAnnotation } from '@babel/types';
import { get_user } from '../../api/User'
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { post_review } from '../../api/Review';
import UnitReview from '../Review/UnitReview';

export default function NewReviewForm(props) {
  const initialState = {
    loading: true,
    error: false,
    submitting: false,
    complete: false,
    verified: false,
    rating: 0,
    buttonStatus: [false, false, false, false, false],
    type: '',
    of: '',
    user: ''
  }
  const [error, setError] = useState(initialState.error);
  const [loading, setLoading] = useState(initialState.loading);
  const [buttonStatus, setButtonStatus] = useState(initialState.buttonStatus);
  const [rating, setRating] = useState(initialState.rating);
  const [type, setType] = useState(initialState.type);
  const [of, setOf] = useState(initialState.of);
  const [user, setUser] = useState(initialState.user);
  const [submitting, setSubmitting] = useState(initialState.submitting);
  const [complete, setComplete] = useState(initialState.complete);
  const [verified, setVerified] = useState(initialState.verified);
  useEffect(() => {
    let localuser;
    try {
      localuser = JSON.parse(localStorage.getItem('user'));
    }
    catch (err) {
      console.log("no local user found " + err);
      return;
    }
    if (localuser) {
      get_user(localuser.id, localuser.token)
        .then((res) => {
          setUser(res.data._id);
          //console.log(props.review_type);
          //console.log("review of: " + props.review_of);
          if (props.review_type && props.review_of) {
            setLoading(false);
          }
          else {
            setError(true);
          }
          if (res.data.verified) {
            setVerified(true);
          }
          //console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          return;
        });
    }

  }, []);
  function handleRating(event) {
    let newbtnstatus = [...buttonStatus];
    for (let i = 0; i < 5; i++) {
      if ((i + 1) == event.target.value) { newbtnstatus[i] = true; }
      else { newbtnstatus[i] = false; }
    }
    setButtonStatus(newbtnstatus);
    setRating(event.target.value);
  }
  function submitReview() {
    let review = {
      type: props.review_type,
      of: props.review_of,
      user: user,
      rating: rating
    };
    let localuser;
    try {
      localuser = JSON.parse(localStorage.getItem('user'));
    }
    catch (err) {
      console.log(err);
      return;
    }
    post_review(review, localuser.token).then((res) => {
      setSubmitting(false);
      setComplete(true);
    })
      .catch((err) => {
        console.log(err);
        alert("unable to post review.");
      });
    setButtonStatus([false, false, false, false, false]);
  }
  if (props.enabled == false) {
    return (
      <>
      </>
    );
  }
  else {
    if (error) {
      return (
        <>
          <h3>error...</h3>
        </>
      );
    }
    else if (loading) {
      return (
        <>
          <h3>loading...</h3>
        </>
      );
    }
    else if (submitting) {
      return (
        <>
          <h3>submitting...</h3>
        </>
      );
    }
    else if (complete) {
      return (
        <>
          <h3>review recieved! thanks for making boone housing better!</h3>
        </>
      );
    }
    else if (!verified) {
      return (
        <>
        you must verify your account to submit a review.
        </>
      );
    }
    else {
      return (
        <>
          {/* <ButtonGroup className="me-2" aria-label="First group">
            <Button onClick={handleRating} disabled={buttonStatus[0]} value={1}>1</Button>
            <Button onClick={handleRating} disabled={buttonStatus[1]} value={2}>2</Button>
            <Button onClick={handleRating} disabled={buttonStatus[2]} value={3}>3</Button>
            <Button onClick={handleRating} disabled={buttonStatus[3]} value={4}>4</Button>
            <Button onClick={handleRating} disabled={buttonStatus[4]} value={5}>5</Button>
          </ButtonGroup>
          <Button onClick={submitReview}>Submit Review</Button> */}
          <UnitReview />
        </>
      );
    }
  }
}