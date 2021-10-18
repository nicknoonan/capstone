import { Component } from "react";
import 'survey-react/survey.css';
import * as Survey from "survey-react";


class UnitReview extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.onCompleteComponent = this.onCompleteComponent.bind(this)
    }
    onCompleteComponent = () =>{
        this.setState({
            isComplete: true
        })
    }

    render(){
        
        var json = {
            "pages": [
                {
                    "name": "page1",
                    "elements": [
                        {
                            "type": "boolean",
                            "name": "Q1",
                            "title": "Please answer the question",
                            "label": "Did you live in this unit?",
                            "isRequired": true
                        },

                        {
                            "type": "boolean",
                            "name": "Q2",
                            "title": "Please answer the question",
                            "label": "Did you ever have to fill our any work orders?",
                            "isRequired": true
                        },

                        {
                            "type": "rating",
                            "name": "work order eff",
                            "title": "On a scale of zero to ten, How efficiently were the work orders handled?",
                            "isRequired": true,
                            "rateMin": 0,
                            "rateMax": 10,
                            "minRateDescription": "(Unsatisfied)",
                            "maxRateDescription": "(Satisfied)"
                        },
                        
                        {
                            "type": "rating",
                            "name": "nps_score",
                            "title": "On a scale of zero to ten, how satisfied were you with your experiencing living at this particular Unit.?",
                            "isRequired": true,
                            "rateMin": 0,
                            "rateMax": 10,
                            "minRateDescription": "(Unsatisfied)",
                            "maxRateDescription": "(Satisfied)"
                        }, {
                            "type": "comment",
                            "name": "written reivew",
                            "visibleIf": "{nps_score} > -1  and {nps_score} < 11",
                            "title": "What is the primary reason for your score?"
                        },
                    ]
                }
            ],
            "showQuestionNumbers": "off"
        };

        var surveyRender = !this.state.isComplete ? (
            <Survey.Survey 
                json={json}
                showCompletedPage={false}
                onComplete={this.onCompleteComponent}
            />
        ) : null

            var onSurveyCompletion = this.state.isComplete ? (
                <div>Review Submitted</div>
            ) : null;

        return (
            <div>
                <div>
                    {surveyRender}
                    {onSurveyCompletion}
                </div>
            </div>
        );
    }
}

export default UnitReview; 