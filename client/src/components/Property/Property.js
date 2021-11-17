import React from 'react';
import { Ul, Li } from './PropertyStyles';
import { get_all_properties } from '../../api/Property';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Nav, Row, Col, Container
} from 'react-bootstrap';
import Aload from '../loading/loading';
import '../../App.css';
import { get_domain } from '../../util';

class Property extends React.Component {
  render() {
    let spacetoU = this.props.property.name;
    spacetoU = spacetoU.replace(/ /g, "_");
    let linktoProperty = get_domain() + "/Property?name=" + this.props.property.name;
    let rating_render = this.props.property.rating ? <Col sm><Card.Text>Rating: {this.props.property.rating}</Card.Text></Col> : null;
    let email_render = this.props.property.email ? <Col sm><Card.Text>email: {this.props.property.email}</Card.Text></Col> : null
    return (
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col md='auto'>
              <Card border="primary" style={{ width: '40rem' }}>
                <Card.Img variant="top" src={this.props.property.card_img_url} />
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
                      {rating_render}
                      <Col sm><Card.Text>Address: {this.props.property.address}</Card.Text></Col>
                    </Row>
                    <Row>
                      <Col sm><Card.Text>Website: {this.props.property.website}</Card.Text></Col>
                      {email_render}
                    </Row>
                    <Row>
                      <Col sm><Card.Text>phone: {this.props.property.phone_office}</Card.Text></Col>
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
      loading: true
    };
  }
  componentDidMount() {
    if (this.props.properties) {

      let properties = this.props.properties;
      this.setState({ properties, loading: false });
    }
    else {
      get_all_properties().then((all_properties) => {
        this.setState({
          loading: false,
          properties: all_properties
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
        let { properties } = this.state;
        //console.log("rendered");
        //console.log(properties);
        const listItems = properties.map((property) =>
          <Property property={property} />
        );
        return (
          <div>
            <h1 className='APUName'>Property List</h1>
            {listItems}
          </div>
        );
      }
    }
  }
}

export { Property, PropertyList };