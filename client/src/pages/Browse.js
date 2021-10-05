import React from "react";
import Agency from "../components/Agency/Agency";
import get_all_agencies from "../api/Agency";
import PropTypes from 'prop-types';
import {AgencyList} from "../components/Agency/Agency";
import {PropertyList} from "../components/Property/Property";
import {UnitList} from "../components/Unit/Unit";
import { Dropdown } from "react-bootstrap";

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




class Browse extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { item: "agency",};
  
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    console.log("Filter Applied");
    this.setState({ item: e.target.value });
  }

  selected() {
    this.setState({
      
    })
  }


  


  render() {
    
    // if(options.value = "agency") {
    //   return (
    //     <>
    //         <div>
    //         <h1>Browsing Agencies</h1>
    
    //         <div className="select-container">
    //           <select value={this.state.item} onChange={this.handleChange}>
                
    //             {options.map((option) => (
    //               <option value={option.value}>{option.label}</option>
    //             ))}
    
    //           </select>
    //         </div>
    
    //         <AgencyList />
    //       </div>
    //     </>
    //   );
    // } else if (options.value = "unit") {
    //   return (
    //     <>
    //         <div>
    //         <h1>Browsing Units</h1>
    
    //         <div className="select-container">
    //           <select value={this.state.item} onChange={this.handleChange}>
                
    //             {options.map((option) => (
    //               <option value={option.value}>{option.label}</option>
    //             ))}
    
    //           </select>
    //         </div>

    //         <UnitList />
    //       </div>
    //     </>
    //   );
    // } else if (options.value = "property") {
    //   return (
    //     <>
    //         <div>
    //         <h1>Browsing Properties</h1>
    
    //         <div className="select-container">
    //           <select value={this.state.item} onChange={this.handleChange}>
                
    //             {options.map((option) => (
    //               <option value={option.value}>{option.label}</option>
    //             ))}
    
    //           </select>
    //         </div>
    
    //         <PropertyList />
    //       </div>
    //     </>
    //   );
    // } else {
        return (
          <div>
            <h1>Browse Boone Housing Help</h1>
    
            <div className="select-container">
              <select value={this.state.item} onChange={this.handleChange}>
                
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