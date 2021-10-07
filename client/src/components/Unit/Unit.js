import React from 'react';
import { Ul, Li } from './UnitStyles';
import {get_all_units} from '../../api/Unit';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Nav, Row, Col, Container
} from 'react-bootstrap';

class Unit extends React.Component {
  
  render() {
    
    let spacetoU = this.props.unit.name;
    spacetoU = spacetoU.replace(/ /g,"_");
    let linktoAgency = "http://localhost:3000/Unit?name=" + this.props.unit.name;
    
    return(
      <>
          <Container>
            <Row className="justify-content-md-center">
              <Col md='auto'>

              <Card border="primary" style={{width: '42rem'}}>
                
                <Card.Img variant="top" src="https://via.placeholder.com/200x100" />
  
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
                            <Col sm><Card.Text>Address: {this.props.unit.address}</Card.Text></Col>
                          </Row>

                          <Row>
                            <Col sm><Card.Text>Website: {this.props.unit.website}</Card.Text></Col>
                            <Col sm><Card.Text>Email: {this.props.unit.email}</Card.Text></Col>
                          </Row>
                          
                          <Row>
                            <Col sm><Card.Text>Phone: {this.props.unit.phone}</Card.Text></Col>
                            <Col sm><Card.Text>Est: {this.props.unit.est}</Card.Text></Col>
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
      console.log("rendered");
      console.log(units);
      const listItems = units.map((unit) => 
        <Unit unit={unit}/>
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

export { Unit, UnitList };