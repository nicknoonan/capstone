import { Component } from "react";
import 'survey-react/survey.css';
import * as Survey from "survey-react";


class UnitReview extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.onCompleteComponent = this.onCompleteComponent.bind(this)
    }
    onCompleteComponent = (sender) => {
        var resultAsString = JSON.stringify(sender.data);
        console.log(resultAsString)
        this.setState({
            isComplete: true
        })
    }



    render() {

        Survey.StylesManager.applyTheme("orange");

        function onCompleteHandler(sender) {
            var resultAsString = JSON.stringify(sender.data);
            alert(resultAsString);
        }


        var json = { "pages": [{ "name": "page1", "elements": [{ "type": "boolean", "name": "LiveBool", "title": "Have you rented from this appartment?", "isRequired": true }, { "type": "boolean", "name": "workOrderBool", "title": "Did you have to fill out any work orders while living here?", "isRequired": true }, { "type": "rating", "name": "workOrderScore", "title": "If so, how efficiently were they carried out?", "isRequired": true }, { "type": "rating", "name": "overallScore", "title": "Overall, how satisfied were you living here?", "isRequired": true }, { "type": "comment", "name": "freeAnswer", "title": "What is your reasoning for your rating?", "isRequired": true }] }] }

        var survey = new Survey.Model(json);
        survey.onComplete.add(onCompleteHandler);

        var surveyRender = !this.state.isComplete ? ( <
            Survey.Survey json = { json }
            showCompletedPage = { false }
            onComplete = { this.onCompleteComponent }
            Survey model = {survey}

            />
        ) : null

        var onSurveyCompletion = this.state.isComplete ? ( 
            <div> Review Submitted </div>
        ) : null;

        return ( 
            <div> { surveyRender } { onSurveyCompletion } </div>
        );
    }
}

export default UnitReview;