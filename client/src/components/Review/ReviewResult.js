import { Component } from "react";
import { get_qmodel_by_type } from "../../api/Qmodel";
import { get_qresults_by_user_id, new_qresult } from "../../api/Qresult";
import { get_user } from "../../api/User";
import { get_agency_by_id } from "../../api/Agency";
import { get_property_by_id } from "../../api/Property";
import { get_unit_by_id } from "../../api/Unit";

import Aload from '../loading/loading';
import '../../App.css';
import Box from '@material-ui/core/Box';
import { Row, Col, Form } from 'react-bootstrap';


const Questions = {
  agency: [
    'Have you rented from this apartment',
    'Did you have to fill out any work orders while living here',
    'If so, how efficiently were they carried out',
    'Overall, how satisfied were you living here',
    'What is your reasoning for your rating'],
  property: [
    'Have you rented from this apartment',
    'Did you have to fill out any work orders while living here',
    'If so, how efficiently were they carried out',
    'Overall, how satisfied were you living here',
    'What is your reasoning for your rating'],
  unit: [
    'Have you rented from this apartment',
    'Did you have to fill out any work orders while living here',
    'If so, how efficiently were they carried out',
    'Overall, how satisfied were you living here',
    'What is your reasoning for your rating']
};
const Qmodels = {
  unit_t: "61731ba95412eac071e03c39",
  property_t: "61731b915412eac071e03c37",
  agency_t: "61731b805412eac071e03c35"
};


class ReviewResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    //console.log(this.props);
    if (this.props.result && this.props.type && this.props.review_of_name) {
      let result = Object.values(this.props.result);
      let type = this.props.type;
      let review_of_name = this.props.review_of_name;
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
      });
      let questions;
      if (type === 'unit_t') {
        questions = Questions.unit;
      }
      else if (type === 'property_t') {
        questions = Questions.property;
      }
      else if (type === 'agency_t') {
        questions = Questions.agency;
      }
      //console.log(questions);
      let i = 0;
      let questions_render = questions.map((question) => {
        return <li key={question}><h4>{question}: {result_modified[i++]}</h4></li>
      });
      return (
        <>
          <h3>{review_of_name}</h3>
          <ul>{questions_render}</ul>
        </>

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
        this.setState({ results: results });
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
        <div>
          <h2 className='SignInText' align='center' margin='50'>Loading Reviews</h2>
          <Aload />
        </div>
      );
    }
    else {
      let title = <h2>Review results:</h2>;
      if (this.props.list_type === 'user_t') {
        title = <h2 className='Pageheader1'>Reviews you've posted: </h2>
      }
      //console.log(this.state.results);
      let results_render = this.state.results.map((item) => {
        //console.log(item);
        let type;
        if (item.qmodel_id === Qmodels.agency_t) {
          type = "agency_t";
        }
        else if (item.qmodel_id === Qmodels.property_t) {
          type = "property_t";
        }
        else if (item.qmodel_id === Qmodels.unit_t) {
          type = "unit_t";
        }
        //console.log(item);
        return <li key={item}><ReviewResult result={item.survey_result} type={type} review_of_name={item.review_of_name} /></li>
      });
      //console.log(this.state.results);
      return (
        <>
          {title}
          <Box
              sx={{
              borderColor: 'rgb(238,238,228)',
              boxShadow: 1,
              borderRadius: 1,
              p: 2,
              minWidth: 'justify',
              margin: 30,
              }}>
                <ul className='ReivewListText'>{results_render}</ul>
            </Box>
        </>
      );
    }
  }
}

export { ReviewResult, ReviewResultList };