import React from "react";
import Agency from "../components/Agency/Agency";
import get_all_agencies from "../api/Agency";
import PropTypes from 'prop-types';
import {AgencyList} from "../components/Agency/Agency";
import {PropertyList} from "../components/Property/Property";
import {UnitList} from "../components/Unit/Unit";


class Browse extends React.Component {
  render() {
    return (
      <div>
        <h1>Browse boonehousing help</h1>
        <AgencyList />
        <PropertyList />
        <UnitList />
      </div>
    );
  }
}

export default Browse;