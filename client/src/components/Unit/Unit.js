import React from 'react';
import { Ul, Li } from './UnitStyles';
import { get_all_units } from '../../api/Unit';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Nav, Row, Col, Container
} from 'react-bootstrap';
import Aload from '../loading/loading';
import '../../App.css';

class Unit extends React.Component {

  render() {
    let spacetoU = this.props.unit.name;
    spacetoU = spacetoU.replace(/ /g, "_");
    let linktoAgency = "http://localhost:3000/Unit?name=" + this.props.unit.name;
    return (
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col md='auto'>

              <Card border="warning" style={{ width: '40rem' }}>

                <Card.Img variant="top" src={this.props.unit.card_image} />

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
                      <Col sm><Card.Text>Rating: {this.props.unit.rating}</Card.Text></Col>
                      <Col sm><Card.Text>Unit Options: {this.props.unit.Unit_options}</Card.Text></Col>
                    </Row>

                    <Row>
                      <Col sm><Card.Text>Agency: {this.props.unit.agency_name}</Card.Text></Col>
                      <Col sm><Card.Text>Cost: {this.props.unit.Cost_range}</Card.Text></Col>

                    </Row>

                    <Row>
                      <Col sm><Card.Text>{this.props.unit.classification}: {this.props.unit.property_name}</Card.Text></Col>
                      <Col sm><Card.Text>Resident: {this.props.unit.resident_range} Person(s) Per Room</Card.Text></Col>
                    </Row>
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
            <h1>Unit List</h1>
            {listItems}
          </div>
        );
      }
    }
  }
}

export { Unit, UnitList };