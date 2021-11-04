// Child component ~ button
import React from 'react';
import '../../App.css';


function ToggleReviewOn(props){
    return (
        <button className='rbutton' onClick={props.onClick}>Make a Review</button>
    );
}

function ToggleReviewOff(props) {
    return (
        <button className='rbutton' onClick={props.onClick}>Close Review</button>
    );
}

export {ToggleReviewOn, ToggleReviewOff}; 