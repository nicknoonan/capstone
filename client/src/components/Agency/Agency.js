import React from 'react';
import { Ul, Li } from './AgencyStyles';
import get_all_agencies from '../../api/Agency';
import PropTypes from 'prop-types';

class Agency extends React.Component {
  render() {
    return(
      <div>
        <Ul>
          <Li><p1>name: {this.props.agency.name}</p1></Li>
          <Li><p1>rating: {this.props.agency.rating}</p1></Li>
          <Li><p1>address: {this.props.agency.address}</p1></Li>
          <Li><p1>website: {this.props.agency.website}</p1></Li>
          <Li><p1>email: {this.props.agency.email}</p1></Li>
          <Li><p1>phone: {this.props.agency.phone}</p1></Li>
          <Li><p1>est: {this.props.agency.est}</p1></Li>
        </Ul>        
      </div>
    );
  }
}

class AgencyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agencies: [],
      isLoaded: false
    };
  }
  componentDidMount() {
    get_all_agencies().then((all_agencies) => {
      this.setState({
        isLoaded: true,
        agencies: all_agencies
      });
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>loading agencies...</div>;
    }
    else {
      let { agencies } = this.state;
      console.log("rendered");
      console.log(agencies);
      const listItems = agencies.map((agency) => 
        <li><Agency agency={agency}/></li>
      );
      return (
        <div>
          <h1>Agency List</h1>
          <ul>{listItems}</ul> 
        </div>
      );
    }
  }
}

export { Agency, AgencyList };