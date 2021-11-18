import { Component } from "react";
import { get_qresults_by_user_id, new_qresult, get_qresults_by_review_of_id, get_qresult_by_id } from "../../api/Qresult";
import Aload from '../loading/loading';
import '../../App.css';
import Box from '@material-ui/core/Box';
import { get_qmodel_by_type, get_qmodel_by_id, AGENCY_MODEL_ID, PROPERTY_MODEL_ID, UNIT_MODEL_ID } from "../../api/Qmodel";
import { Row, Col, Form, Card, Container } from 'react-bootstrap';
import { thisTypeAnnotation } from "@babel/types";
const Qmodels = {
  unit_t: UNIT_MODEL_ID,
  property_t: PROPERTY_MODEL_ID,
  agency_t: AGENCY_MODEL_ID
};

const unit_t = 0;
const property_t = 1;
const agency_t = 2;

// Takes properties of qTitles and the resuts of those quesitons 
class ReviewResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let titles = this.props.qTitles;
    //console.log(titles);
    let results = this.props.results;
    //console.log(results);

    let renderResults = results.map((result, i) => {
      if (result === true) {
        result = "Yes";
      }
      else if (result === false) {
        result = "No";
      }
      else if (typeof (result) === "object") {
        let length = result.length;
        if (length) {
          result = result.map((item, j) => {
            if (j < length - 1) {
              item += ', ';
            }
            return item;
          });
        }
      }
      //console.log(result);
      // return <h1><h2>{this.props.qTitles[i]}</h2> <h2>{result}</h2></h1>
      // return <li>{titles[i]} {result}</li>
      return (
        <div>
          <Box>
            <Row>
              <Col>
                <h1 className='questionText'>{this.props.qTitles[i]} <a className='answerText'> {result}</a></h1>
              </Col>
            </Row>
          </Box>
        </div>
      )
    });
    return (
      <div>
        {/* <h1>{this.props.qTitles[0]} {this.props.results[4]}</h1> */}
        <ul>
          {renderResults}
        </ul>
      </div>
    )
  }
}
//takes in a user_id or review_of_id with an associated type

class ReviewResultList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list_type: null,
      loading: true,
      loading_models: true,
      results: [],
      results_render: null,
      qmodel: null,
      qtitles: null,
    };
  }

  componentDidMount() {
    //get all qtitles
    let qmodel_ids = Object.values(Qmodels);
    let qtitles = [];
    qmodel_ids.forEach((id, i) => {
      get_qmodel_by_id(id).then((qmodel) => {
        //console.log(qmodel);
        const model_titles = qmodel.survey_json.pages[0].elements.map((element) => {
          return element.title;
        });
        qtitles[i] = model_titles;
        if (i == 2) {
          this.setState({ loading_models: false, qtitles });
        }
      }).catch((err) => {
        console.log(err);
      });
    });

    if (this.props.list_type && (this.props.user_id || this.props.review_of_id)) {
      let list_type = this.props.list_type;
      let user_id = this.props.user_id;
      let review_of_id = this.props.review_of_id;
      if (list_type === 'user_t' && user_id) {
        get_qresults_by_user_id(user_id).then((results) => {
          this.setState({ results });
          //console.log(results);
          this.setState({ loading: false });
        }).catch((err) => {
          alert('error check console');
          console.log(err);
        });
      }
      else if ((list_type === 'agency_t' ||
        list_type === 'property_t' ||
        list_type === 'unit_t') && review_of_id) {
        //
        get_qresults_by_review_of_id(review_of_id).then((results) => {
          this.setState({ results });
          console.log(results);
          this.setState({ loading: false });
        }).catch((err) => {
          alert('error check console');
          console.log(err);
        });
      }
    }
  }
  render() {
    if (this.state.loading_models || this.state.loading) {
      return (
        <div>
          <h2 className='SignInText' align='center' margin='50'>Loading Reviews</h2>
          <Aload />
        </div>
      );
    }
    else {
      console.log(this.state.qtitles);
      let title = <h2>Review results:</h2>;
      if (this.props.list_type === 'user_t') {
        title = <h2 className='Pageheader1'>Reviews you've posted: </h2>
      }
      else {
        title = <h2 className='Pageheader1'>Reviews Posted: </h2>
      }
      let results = this.state.results
      let renderResults = results.map((result, i) => {
        console.log(result);
        let resultArray = Object.values(result.survey_result)
        let title_type;
        if (result.qmodel_id === Qmodels.unit_t) {
          title_type = unit_t;
        }
        else if (result.qmodel_id === Qmodels.agency_t) {
          title_type = agency_t;
        }
        else if (result.qmodel_id === Qmodels.property_t) {
          title_type = property_t;
        }
        console.log(title_type);
        console.log(this.state.qtitles[title_type]);
        return <ReviewResult qTitles={this.state.qtitles[title_type]} results={resultArray} />
      });

      return (
        <>
          {title}
          <a>{renderResults}</a>
        </>
      );
    }
  }
}

export { ReviewResult, ReviewResultList };