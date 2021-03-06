import React from "react";
import { AgencyList } from "../components/Agency/Agency";
import { PropertyList } from "../components/Property/Property";
import { UnitList } from "../components/Unit/Unit";
import { search_agencies } from "../api/Agency";
// import { Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { thisTypeAnnotation } from "@babel/types";
import { search_properties } from "../api/Property";
import { search_units } from "../api/Unit";
import Box from '@material-ui/core/Box';
import { Row, Col, Container, Form, FloatingLabel } from 'react-bootstrap';
import Aload from '../components/loading/loading';
import '../App.css';
import Button from "@restart/ui/esm/Button";

const options = [
  {
    label: "Agency",
    value: "agency",
  },
  {
    label: "Unit",
    value: "unit",
  },
  {
    label: "Property",
    value: "property",
  },
];
const agency_t = 0;
const unit_t = 1;
const property_t = 2;
const initial_state = {
  filter_item: [true, false, false],
  entities: null,
  loading: false,
  loading_entities: false,
  query: "",
  filter_selection: ""
};
class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = initial_state;
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
  }
  componentDidMount() {
    //this.setState({ loading: false });
    //this.setState({ loading_entities: false });
    this.setState({filter_selection: "agency"});
  }
  componentWillUnmount() {
    this.setState({filter_selection: "agency"});
  }
  handleQuery(event) {
    let query = event.target.value;
    this.setState({ query });
  }
  handleQuerySubmit() {
    let filter = this.state.filter_item;
    this.setState({ entities: null });
    if (filter[agency_t]) {
      this.setState({ loading_entities: true });
      search_agencies("name", this.state.query).then((agencies) => {
        //console.log(agencies);
        this.setState({ entities: agencies });
        this.setState({ loading_entities: false });
      }).catch((err) => {
        console.log(err);
        this.setState({ loading_entities: false });
      });
    }
    else if (filter[property_t]){
      //TODO: implement search_property api request
      this.setState({ loading_entities: true });
      search_properties("name", this.state.query).then((properties) => {
        //console.log(properties);
        this.setState({ entities: properties });
        this.setState({ loading_entities: false });
      }).catch((err) => {
        //console.log(err);
        this.setState({ loading_entities: false });
      });
    }
    else if (filter[unit_t]){
      //TODO: implement search_unit api request
      this.setState({ loading_entities: true });
      search_units("name", this.state.query).then((units) => {
        //console.log(units);
        this.setState({ entities: units });
        this.setState({ loading_entities: false });
      }).catch((err) => {
        console.log(err);
        this.setState({ loading_entities: false });
      });
    }
  }
  handleFilterChange(event) {
    //console.log("Filter Applied");
    this.setState({filter_selection: event.target.value});
    let filter = [false, false, false];
    if (event.target.value == "agency") {
      filter[agency_t] = true;
    }
    else if (event.target.value == "property") {
      filter[property_t] = true;
    }
    else if (event.target.value == "unit") {
      filter[unit_t] = true;
    }
    this.setState({ filter_item: filter, query: "", entities: null });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h2 className='SignInText' align='center' margin='50'>Loading Local Housing Options</h2>
          <Aload />
        </div>
      );
    }
    else {
      let entity_list = null;
      let filter_item = this.state.filter_item;
      let entities = this.state.entities;
      if (this.state.loading_entities) {
        entity_list = <>loading entities</>;
      }
      else if (filter_item[agency_t]) {
        entity_list = <AgencyList agencies={entities} />
      }
      else if (filter_item[property_t]) {
        entity_list = <PropertyList properties={entities} enabled={true} />
      }
      else if (filter_item[unit_t]) {
        entity_list = <UnitList units={entities} enabled={true} />
      }
      return (
        <div>
          <h1 className='Pageheader1'>Browse Boone Housing Help</h1>
          <div className="select-container">
            <Box>
              <Row>
                <Col>
                  <Box sx={{margin: 10}}>
                    {/* <input type="text" value={this.state.query} onChange={this.handleQuery} />
                    <button onClick={this.handleQuerySubmit}>search</button> */}

                    <Form.Group className='mb-3'>
                      {/* <Form.Label>Search</Form.Label> */}
                      <Form.Control type="text" value={this.state.query} onChange={this.handleQuery}></Form.Control>
                      <Form.Text className='text-muted'>
                        Search for a Housing Agency/Property/Unit
                      </Form.Text>
                    </Form.Group>
                    <Button className='button' onClick={this.handleQuerySubmit}>
                      Submit
                    </Button>
                  </Box>
              </Col>

                <Col>
                  <Box sx={{margin: 10}}>
                    {/* <select value={this.state.item} onChange={this.handleFilterChange}>
                      {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select> */}
                    
                    <Form.Select onChange={this.handleFilterChange}>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Form.Select>
                  </Box>
                </Col>
              </Row>
            </Box>
            
          </div>
          {entity_list}
        </div>
      );
    }

  }
}
export default Browse;