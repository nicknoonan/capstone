import { Component } from "react";
import 'survey-react/survey.css';
import * as Survey from "survey-react";
import { get_qmodel_by_type } from "../../api/Qmodel";
import { get_qresults_by_user_id, new_qresult } from "../../api/Qresult";
import { UserContext } from "../../context/Store";
import { set } from "mongoose";

const UNIT_T = 'unit_t';
const PROPERTY_T = 'property_t';
const AGENCY_T = 'agency_t';

//props: review_of_id, type, entity_name

class EntityReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      survey_json: {},
      enabled: true,
      user: null,
      qmodel_id: "",
    }
    this.onReviewComplete = this.onReviewComplete.bind(this)
  }
  onReviewComplete = (sender) => {
    let survey_result = sender.data;
    console.log(survey_result);
    let qresult = {
      qmodel_id: this.state.qmodel_id,
      user_id: this.state.user.id,
      review_of_id: this.state.review_of_id,
      review_of_name: this.props.entity_name,
      survey_result: survey_result
    };
    //console.log(qresult);
    new_qresult(qresult).then((res) => {
      this.setState({
        isComplete: true
      });
    }).catch((err) => {
      alert("error check console");
      console.log(err);
      console.log(err.message);
    });
    
  }
  componentDidMount() {
    //console.log("entity review");
    let user_id;
    let user_token;
    let review_of_id = this.props.review_of_id;
    let type = this.props.type;
    let [user] = this.context;
    if (!(user.verified && user.auth)) {
      this.setState({enabled: false});
      return;
    }
    this.setState({user: user});
    //console.log(user);
    if (!(review_of_id && (type === UNIT_T || type === PROPERTY_T || type === AGENCY_T))) {
      this.setState({enabled: false});
      console.log("invalid props passed to EntityReview");
      return;
    }

    get_qmodel_by_type(type).then((qmodel) => {
      //check to see if the user has already reviewed this entity
      get_qresults_by_user_id(user.id).then((qresults) => {
        qresults.forEach((result) => {
          //console.log(result);
          if (result.review_of_id === review_of_id) {
            this.setState({ enabled: false });
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
      Survey.StylesManager.applyTheme("orange");
      var json = this.state.survey_json;
      var survey = new Survey.Model(json);

      var surveyRender = (!this.state.isComplete && !this.state.loading) ? (<
        Survey.Survey json={json}
        showCompletedPage={false}
        onComplete={this.onReviewComplete}
        Survey model={survey}
      />
      ) : null;

      var onSurveyCompletion = (this.state.isComplete && !this.state.loading) ? (
        <div> Review Submitted </div>
      ) : null;

      var loadingAnimation = this.state.loading ? (
        <h3>loading...</h3>
      ) : null;

      return (
        <div> {surveyRender} {onSurveyCompletion} {loadingAnimation}</div>
      );
    }
    else {
      return (
        <></>
      );
    }
  }
}
EntityReview.contextType = UserContext;

export default EntityReview;