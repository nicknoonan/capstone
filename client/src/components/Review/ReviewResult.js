import { Component } from "react";
import { get_qmodel_by_type } from "../../api/Qmodel";
import { get_qresults_by_user_id, new_qresult } from "../../api/Qresult";
import { get_user } from "../../api/User";

const questions = [
  'Have you rented from this apartment',
  'Did you have to fill out any work orders while living here',
  'If so, how efficiently were they carried out',
  'Overall, how satisfied were you living here',
  'What is your reasoning for your rating'];


class ReviewResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    //console.log(this.props);
    if (this.props.result) {
      let i = 0;
      let result = Object.values(this.props.result);
      let result_modified = result.map((item) => {
        if (item === true) {
          return 'yes';
        }
        else if (item === false) {
          return 'no';
        }
        else {
          return item;
        }
      })
      let jsx_questions = questions.map((question) => {
        return <li key={question}><h4>{question}: {result_modified[i++]}</h4></li>
      });
      return (
        <ul>{jsx_questions}</ul>
      );
    }
    else {
      return (
        <>
          error
        </>
      );
    }
  }
}

//takes in a user_id or review_of_id with an associated type
class ReviewResultList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list_type: null,
      loading: true,
      results: null,
      results_render: null,
    };
  }
  componentDidMount() {
    //console.log(this.props);
    if (this.props.list_type === 'user_t' && this.props.user_id) {
      this.setState({ list_type: this.props.list_type });
      get_qresults_by_user_id(this.props.user_id).then((results) => {
        this.setState({ results });
        this.setState({ loading: false });
      }).catch((err) => {
        alert('error check console');
        console.log(err);
      });
    }
    else if (this.props.list_type === 'agency_t' && this.props.review_of_id) {

    }
    else if (this.props.list_type === 'property_t' && this.props.review_of_id) {

    }
    else if (this.props.list_type === 'unit_t' && this.props.review_of_id) {
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <>loading...</>
      );
    }
    else {
      let r;
      let results_render = this.state.results.map((item) => {
        return <li key={item}><ReviewResult result={item.survey_result} /></li>
      });
      //console.log(this.state.results);
      return (
        <>
          <h2>review result list</h2>
          <ul>{results_render}</ul>
        </>
      );
    }

  }
}

export { ReviewResult, ReviewResultList };