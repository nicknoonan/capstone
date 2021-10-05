import React from 'react';
import { Ul, Li } from './PropertyStyles';
import {get_all_properties} from '../../api/Property';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Nav, Row, Col
} from 'react-bootstrap';

class Property extends React.Component {
  render() {
    
    let spacetoU = this.props.property.name;
    spacetoU = spacetoU.replace(/ /g,"_");
    let linktoProperty = "http://localhost:3000/Property?name=" + this.props.property.name;
    
    return(
      <>
              <Card border="primary" style={{ width: '42rem' }}>
                
              <Card.Img variant="top" src="https://via.placeholder.com/50x25" />

                <Card.Header>
                  
                  <Nav variant="tabs" defaultActiveKey="#first">
                    
                    <Nav.Item>
                      <Nav.Link href={linktoProperty}>name: {this.props.property.name}</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link href="#link">website: {this.props.property.website}</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link href="#address">{this.props.property.address}</Nav.Link>
                    </Nav.Item>

                </Nav>
                </Card.Header>

                    

                    <Card.Body>
                    <Card.Text>rating: {this.props.property.rating}</Card.Text>
                    <Card.Text>email: {this.props.property.email}</Card.Text>
                    <Card.Text>phone: {this.props.property.phone}</Card.Text>
                    <Card.Text>Agency phone: {this.props.property.agency}</Card.Text>
                    <Card.Text>est: {this.props.property.est}</Card.Text>
                    </Card.Body>

                </Card>
                <br />
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
        <li><Property property={property}/></li>
      );
      return (
        <div>
          <h1>Property List</h1>
          <ul className="default-list">{listItems}</ul> 
        </div>
      );
    }
  }
}

export { Property, PropertyList };