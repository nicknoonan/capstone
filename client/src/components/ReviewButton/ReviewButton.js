// Partent Commponent
import React from 'react';
import AgencyReview from '../Review/AgencyReview'
import {ToggleReviewOn, ToggleReviewOff} from './button';

class ReviewButton extends React.Component {
    constructor(props) {
        super(props);
        this.handelClick = this.handelClick.bind(this);
        this.state = {isToggleOn: false};
    }

    handelClick() {
        let currentToggle = this.state.isToggleOn
        this.setState({isToggleOn: !currentToggle})
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const isToggleOn = this.state.isToggleOn;
        let button;
        if (!isToggleOn) {
            button = <ToggleReviewOn onClick={this.handelClick}/>
        } else {
            button = <ToggleReviewOff onClick={this.handelClick}/>
        }
        console.log(this.state.isToggleOn)
        let toggle = this.state.isToggleOn;
        let agency_review = toggle ? <AgencyReview agency_id={this.props.id} agency_name={this.props.name} enabled={true}/> : null;
        return (
            <div>
                {button}
                {agency_review}
            </div>
        );
    }

}

export default ReviewButton;