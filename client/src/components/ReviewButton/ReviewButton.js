// Partent Commponent
import React from 'react';
import EntityReview from '../Review/EntityReview'
import { ToggleReviewOn, ToggleReviewOff } from './button';

//props: review_of_id, type, entity_name

class ReviewButton extends React.Component {
  constructor(props) {
    super(props);
    this.handelClick = this.handelClick.bind(this);
    this.state = { 
      isToggleOn: false,
      enabled: true, 
    };
  }

  handelClick() {
    let currentToggle = this.state.isToggleOn
    this.setState({ isToggleOn: !currentToggle })
  }

  componentDidMount() {
    //console.log(this.props);
  }

  render() {
    if (this.state.enabled) {
      //const isToggleOn = this.state.isToggleOn;
      let button = this.state.isToggleOn ? <ToggleReviewOff onClick={this.handelClick} /> : <ToggleReviewOn onClick={this.handelClick} />;
      //console.log(this.state.isToggleOn)
      //let toggle = this.state.isToggleOn;
      let agency_review = this.state.isToggleOn ? 
        <EntityReview review_of_id={this.props.review_of_id} type={this.props.type} entity_name={this.props.entity_name} /> 
        : null;
      return (
        <div>
          {button}
          {agency_review}
        </div>
      );
    }
    else {
      return null;
    }
  }

}

export default ReviewButton;