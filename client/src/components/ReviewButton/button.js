// Child component ~ button
import React from 'react';

function ToggleReviewOn(props){
    return (
        <button onClick={props.onClick}>Make a Review</button>
    );
}

function ToggleReviewOff(props) {
    return (
        <button onClick={props.onClick}>Close Review</button>
    );
}

export {ToggleReviewOn, ToggleReviewOff}; 