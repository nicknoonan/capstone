// Partent Commponent
import React from 'react';
import EntityReview from '../Review/EntityReview'
import { ToggleReviewOn, ToggleReviewOff } from './button';
import { UserContext } from "../../context/Store";
import { get_qmodel_by_type } from "../../api/Qmodel";
import { get_qresults_by_user_id } from "../../api/Qresult";

//props: review_of_id, type, entity_name

class ReviewButton extends React.Component {
  constructor(props) {
    super(props);
    this.handelClick = this.handelClick.bind(this);
    this.state = { 
      isToggleOn: false,
      enabled: true,
      duplicate: false, 
    };
  }

  handelClick() {
    let currentToggle = this.state.isToggleOn
    this.setState({ isToggleOn: !currentToggle })
  }

  componentDidMount() {
    let type = this.props.type;
    let review_of_id = this.props.review_of_id;
    let entity_name = this.props.entity_name;
    let [user] = this.context;
    get_qmodel_by_type(type).then((qmodel) => {
      //check to see if the user has already reviewed this entity
      get_qresults_by_user_id(user.id).then((qresults) => {
        qresults.forEach((result) => {
          //console.log(result);
          if (result.review_of_id === review_of_id) {
            this.setState({ duplicate: true });
          }
        });
        //user hasn't already review the entity
        if (this.state.enabled) {
          this.setState({ 
            survey_json: qmodel.survey_json, 
            loading: false,
            review_of_id: review_of_id, 
            qmodel_id: qmodel._id 
          });
        }
      }).catch((err) => {
        //alert("error check console");
        console.log(err);
      });
      
    }).catch((err) => {
      //alert("error check console");
      console.log(err);
    });
  }
  render() {
    if (this.state.enabled) {
      let button = this.state.isToggleOn ? <ToggleReviewOff onClick={this.handelClick} /> : <ToggleReviewOn onClick={this.handelClick} />;
      let agency_review = this.state.isToggleOn ? 
        <EntityReview review_of_id={this.props.review_of_id} type={this.props.type} entity_name={this.props.entity_name} /> 
        : null;
      if (this.state.duplicate) {
        button = null
        agency_review = <>you've already reviewed this entity</>
      }
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
ReviewButton.contextType = UserContext;

export default ReviewButton;