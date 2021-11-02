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
  }

  render() {
    if (this.state.enabled) {
      let button = this.state.isToggleOn ? <ToggleReviewOff onClick={this.handelClick} /> : <ToggleReviewOn onClick={this.handelClick} />;
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