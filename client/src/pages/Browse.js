import React from "react";
import Agency from "../components/Agency/Agency";
import get_all_agencies from "../api/Agency";
import PropTypes from 'prop-types';
import { AgencyList } from "../components/Agency/Agency";
import { PropertyList } from "../components/Property/Property";
import { UnitList } from "../components/Unit/Unit";
import { Dropdown } from "react-bootstrap";

const options = [
  {
    label: "Agency",
    value: "agency",
    enabled: true
  },
  {
    label: "Unit",
    value: "unit",
    enabled: false
  },
  {
    label: "Property",
    value: "property",
    enabled: false
  },
];
class Browse extends React.Component {

  constructor(props) {
    super(props);
    this.state = { item: "agency", };
    this.handleChange = this.handleChange.bind(this);
  }

  handleFilterChange(e) {
    console.log("Filter Applied");
    this.setState({ item: e.target.value });
  }
  render() {
    return (
      <div>
        <h1>Browse Boone Housing Help</h1>

        <div className="select-container">
          <select value={this.state.item} onChange={this.handleFilterChange}>

            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}

          </select>
        </div>

        <AgencyList />
        <PropertyList />
        <UnitList />
      </div>
    );
    //}
  }
}

export default Browse;