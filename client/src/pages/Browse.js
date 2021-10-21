import React from "react";
import { AgencyList } from "../components/Agency/Agency";
import { PropertyList } from "../components/Property/Property";
import { UnitList } from "../components/Unit/Unit";
// import { Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


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
  filter_item: [true, false, false]
};
class Browse extends React.Component {

  constructor(props) {
    super(props);
    this.state = initial_state;
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(event) {
    console.log("Filter Applied");
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
    this.setState({ filter_item: filter });
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
        <AgencyList enabled={this.state.filter_item[agency_t]} />
        <PropertyList enabled={this.state.filter_item[property_t]} />
        <UnitList enabled={this.state.filter_item[unit_t]} />
      </div>
    );
    //}
  }
}
export default Browse;