// Partent Commponent
import React from 'react';
import EntityReview from '../Review/EntityReview'
import { ToggleReviewOn, ToggleReviewOff } from './button';
import { UserContext } from "../../context/Store";
import { get_qmodel_by_type } from "../../api/Qmodel";
import { get_qresults_by_user_id } from "../../api/Qresult";
import '../../App.css';
import Aload from '../loading/loading';
import Box from '@material-ui/core/Box';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Nav, Row, Col, Container } from 'react-bootstrap';

//props: review_of_id, type, entity_name

class ReviewButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
      isToggleOn: false,
      enabled: true,
      duplicate: false,
      submitted: false
    };
  }

  handleClick() {
    let currentToggle = this.state.isToggleOn
    this.setState({ isToggleOn: !currentToggle })
  }
  handleSubmit() {
    this.setState({submitted: true});
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
    let [user] = this.context;
    if (this.state.enabled) {
      let button = this.state.isToggleOn ? <ToggleReviewOff onClick={this.handleClick} /> : <ToggleReviewOn onClick={this.handleClick} />;
      let agency_review = this.state.isToggleOn ? 
        <EntityReview on_success={this.handleSubmit} review_of_id={this.props.review_of_id} type={this.props.type} entity_name={this.props.entity_name} /> 
        : null;
      if (this.state.duplicate) {
        button = null
        agency_review = <>
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
                <h2 className='answerText'>You've already left a review here</h2>
              </Box>
            </Col>

            <Col>
            </Col>
          </Row>
        </Box>
        </>
      }
      else if (!user.auth) {
        button = null
        agency_review = <>
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
                <h2 className='answerText'>You must be logged in to leave a review!</h2>
              </Box>
            </Col>

            <Col>
            </Col>
          </Row>
        </Box>
        </>
      }
      else if (this.state.submitted) {
        button = null
        agency_review = <>
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
                <h2 className='answerText'>You're review has been submitted!</h2>
              </Box>
            </Col>

            <Col>
            </Col>
          </Row>
        </Box>
        </>
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