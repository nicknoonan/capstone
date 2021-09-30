import React from 'react';
import { Ul, Li } from './UnitStyles';
import get_all_units from '../../api/Unit';

class Unit extends React.Component {
  render() {
    return(
      <div>
        <Ul>
          <Li>rating: {this.props.unit.rating}</Li>
          <Li>address: {this.props.unit.address}</Li>
          <Li>property name: {this.props.unit.property_name}</Li>
          <Li>agency name: {this.props.unit.agency_name}</Li>
          <Li>numbed: {this.props.unit.num_bed}</Li>
          <Li>numbath: {this.props.unit.num_bath}</Li>
        </Ul> 
      </div>
    );
  }
}

class UnitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      isLoaded: false
    };
  }
  componentDidMount() {
    get_all_units().then((all_units) => {
      this.setState({
        isLoaded: true,
        units: all_units
      });
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>loading units...</div>;
    }
    else {
      let { units } = this.state;
      const listItems = units.map((unit) => 
        <li><Unit unit={unit}/></li>
      );
      return (
        <div>
          <h1>Unit List</h1>
          <ul>{listItems}</ul> 
        </div>
      );
    }
  }
}

export { Unit, UnitList };