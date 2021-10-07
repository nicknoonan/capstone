import React from 'react';
import { Ul, Li } from './PropertyStyles';
import {get_all_properties} from '../../api/Property';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Nav, Row, Col, Container
} from 'react-bootstrap';

class Property extends React.Component {
  render() {
    
    let spacetoU = this.props.property.name;
    spacetoU = spacetoU.replace(/ /g,"_");
    let linktoProperty = "http://localhost:3000/Property?name=" + this.props.property.name;
    
    return(
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col md='auto'>
            
            <Card border="primary" style={{ width: '40rem' }}>

                <Card.Img variant="top" src="https://via.placeholder.com/200x100" />
  
                  <Card.Header>
                    <Nav variant="pills" defaultActiveKey="#first">
                        <Nav.Link href={linktoProperty}>
                          {this.props.property.name}
                        </Nav.Link>
                    </Nav>
                  </Card.Header>
  
                      
  
                      <Card.Body>
                        <Container>
                          <Row>
                            <Col sm><Card.Text>Rating: {this.props.property.rating}</Card.Text></Col>
                            <Col sm><Card.Text>Address: {this.props.property.address}</Card.Text></Col>
                          </Row>

                          <Row>
                            <Col sm><Card.Text>Website: {this.props.property.website}</Card.Text></Col>
                            <Col sm><Card.Text>email: {this.props.property.email}</Card.Text></Col>
                          </Row>

                          <Row>
                            <Col sm><Card.Text>phone: {this.props.property.phone}</Card.Text></Col>
                            <Col sm><Card.Text>est: {this.props.property.est}</Card.Text></Col>
                          </Row>
                        </Container>
                      
                      {/* <Card.Text>Agency phone: {this.props.property.agency}</Card.Text> */}
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

class PropertyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      isLoaded: false
    };
  }
  componentDidMount() {
    get_all_properties().then((all_properties) => {
      this.setState({
        isLoaded: true,
        properties: all_properties
      });
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>loading properties...</div>;
    }
    else {
      let { properties } = this.state;
      console.log("rendered");
      console.log(properties);
      const listItems = properties.map((property) => 
        <Property property={property}/>
      );
      return (
        <div>
          <h1>Property List</h1>
          {listItems}
        </div>
      );
    }
  }
}

export { Property, PropertyList };