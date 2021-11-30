import React from 'react';
import { Ul, Li } from './UnitStyles';
import { get_all_units } from '../../api/Unit';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Nav, Row, Col, Container
} from 'react-bootstrap';
import Aload from '../loading/loading';
import '../../App.css';
import { get_domain } from '../../util';

class Unit extends React.Component {

  render() {
    let spacetoU = this.props.unit.name;
    spacetoU = spacetoU.replace(/ /g, "_");
    let linktoAgency = "/Unit?name=" + this.props.unit.name;
    let agency_render = this.props.unit.agency_name ? <Col sm><Card.Text>Agency: {this.props.unit.agency_name}</Card.Text></Col> : null;
    let rating_render = this.props.unit.rating ? <Col sm><Card.Text>Rating: {this.props.unit.rating}</Card.Text></Col> : null;
    let maintenance_rating_render = this.props.unit.maintenance_rating ? <Row><Col sm><Card.Text>Maintenance Rating: {this.props.unit.maintenance_rating }</Card.Text></Col></Row> : null;
    return (
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col md='auto'>

              <Card border="primary" style={{ width: '40rem' }}>

                <Card.Img variant="top" src={this.props.unit.card_image_url} />

                <Card.Header>
                  <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Link href={linktoAgency}>
                      {this.props.unit.name}
                    </Nav.Link>
                  </Nav>
                </Card.Header>

                <Card.Body>
                  <Container>
                    <Row>
                      {rating_render}
                      <Col sm><Card.Text>Unit Name: {this.props.unit.floorplan_name}</Card.Text></Col>
                    </Row>

                    <Row>
                      {agency_render}
                      <Col sm><Card.Text>Cost per month: {this.props.unit.floorplan_cost}</Card.Text></Col>
                    </Row>

                    <Row>
                      <Col sm><Card.Text>Classification: {this.props.unit.classification}</Card.Text></Col>
                      <Col sm><Card.Text>Number of bedrooms: {this.props.unit.number_of_bedrooms}</Card.Text></Col>
                    </Row>
                    {maintenance_rating_render}
                  </Container>
                </Card.Body>

              </Card>
              <br />

            </Col>
          </Row>
        </Container>

      </>
    );
  }
}

class UnitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [],
      loading: false
    };
  }
  componentDidMount() {
    if (this.props.units) {
      console.log(this.props.units);
      let units = this.props.units;
      this.setState({units, loading: false});
    }
    else {
      get_all_units().then((all_units) => {
        this.setState({
          loading: false,
          units: all_units
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  render() {
    const { loading } = this.state;
    if (this.props.enabled == false) {
      return (
        <></>
      );
    }
    else {
      if (loading) {
        return (
          <div>
            <h2 className='SignInText' align='center' margin='50'>Loading Local Housing Options</h2>
            <Aload />
          </div>
        );
      }
      else {
        let { units } = this.state;
        //console.log("rendered");
        //console.log(units);
        const listItems = units.map((unit) =>
          <Unit unit={unit} />
        );
        return (
          <div>
            <h1 className='APUName'>Unit List</h1>
            {listItems}
          </div>
        );
      }
    }
  }
}

export { Unit, UnitList };