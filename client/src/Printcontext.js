import React from "react";
import { GlobalContext } from "./context/Store";

export default class Printcontext extends React.Component {
  static contextType = GlobalContext
  componentDidMount(){
    console.log("print context" + JSON.stringify(this.context));
  }
  render() {
    return(
      <>
      </>
    );
  }
}