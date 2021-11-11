import { Component } from "react";
import { get_qresults_by_user_id, new_qresult, get_qresults_by_review_of_id } from "../../api/Qresult";
import Aload from '../loading/loading';
import '../../App.css';
import Box from '@material-ui/core/Box';
import { get_qmodel_by_type } from "../../api/Qmodel";
import { Row, Col, Form, Card, Container } from 'react-bootstrap';

const Qmodels = {
  unit_t: "61731ba95412eac071e03c39",
  property_t: "61731b915412eac071e03c37",
  agency_t: "61731b805412eac071e03c35"
};

// Takes properties of qTitles and the resuts of those quesitons 
class ReviewResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
    let titles = this.props.qTitles;
    console.log(titles); 
    let results = this.props.results;
    console.log(results);

    let renderResults = results.map((result, i) => {
      if (result === true) {
        result = "yes";
      }
      else if (result === false) {
        result = "no";
      }
      console.log(result); 
      return <li>{titles[i]} {result}</li>
    });
    

    return (
      <ul>
        {renderResults}
      </ul>
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
      results: [],
      results_render: null,
      qmodel: null,
      qtitles: null,
    };
  }

  componentDidMount() {
    // Checking if the type is a user (for displaying on user profile)
    if (this.props.list_type === 'user_t' && this.props.user_id) {
      this.setState({ list_type: this.props.list_type });
      get_qresults_by_user_id(this.props.user_id).then((results) => {
        this.setState({ results: results });
        this.setState({ loading: false });
      }).catch((err) => {
        alert('error check console');
        console.log(err);
      });
    } else {
      // Here we are checking to make sure that we are receving a list type AND a userID or review of ID
      if (this.props.list_type && (this.props.user_id || this.props.review_of_id)){
        get_qmodel_by_type(this.props.list_type).then((qmodel) => {
          this.setState({ qmodel });
          console.log(qmodel);

          const qtitles = qmodel.survey_json.pages[0].elements.map((element) => {
            return element.title; 
          });
          this.setState({ qtitles })


          // Here is our if statments if we are dealing with an agency/unit/property reveiw
          if (this.props.list_type === 'agency_t' && this.props.review_of_id) {
  
            console.log("here");
            
            this.setState({ list_type: this.props.list_type });
  
            get_qresults_by_review_of_id(this.props.review_of_id).then((results) => {
              
              this.setState({ results });
              console.log(results);

              
              this.setState({ loading: false });
  
            }).catch((err) => {
              this.setState({ loading: false });
              alert('error check console');
              console.log(err);
            });
  
          }
          else if (this.props.list_type === 'property_t' && this.props.review_of_id) {
            console.log("here");
            
            this.setState({ list_type: this.props.list_type });
  
            get_qresults_by_review_of_id(this.props.review_of_id).then((results) => {
              
              this.setState({ results });
              console.log(results);
              
              this.setState({ loading: false });
  
            }).catch((err) => {
              this.setState({ loading: false });
              alert('error check console');
              console.log(err);
            });
  
          }
          else if (this.props.list_type === 'unit_t' && this.props.review_of_id) {
            console.log("here");
            
            this.setState({ list_type: this.props.list_type });
  
            get_qresults_by_review_of_id(this.props.review_of_id).then((results) => {
              
              this.setState({ results });
              console.log(results);

              
              this.setState({ loading: false });
  
            }).catch((err) => {
              this.setState({ loading: false });
              alert('error check console');
              console.log(err);
            });
  
          }
  
  
        }).catch((err) => {
          alert('error check console');
          console.log(err);
        });
      }
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
      else {
        title = <h2 className='Pageheader1'>Reviews Posted: </h2>
      }

      let results = this.state.results
      let renderResults = results.map((result, i) => {
        console.log(result);
        let resultArray = Object.values(result.survey_result)
          return <ReviewResult qTitles={this.state.qtitles} results={resultArray}/> 
      });




     
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
                <a className='ReivewListText'>{renderResults}</a>
            </Box>
        </>
      );
    }
  }
}

export { ReviewResult, ReviewResultList };