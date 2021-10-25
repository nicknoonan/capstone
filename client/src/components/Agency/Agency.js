import React from 'react';
// import { Ul, Li } from './AgencyStyles';
import { get_all_agencies } from '../../api/Agency';
// import PropTypes from 'prop-types';
import {
  Card, Nav, Row, Col, Container
} from 'react-bootstrap';
import Aload from '../loading/loading';
import '../../App.css';

class Agency extends React.Component {
  render() {
    let spacetoU = this.props.agency.name;
    spacetoU = spacetoU.replace(/ /g, "_");
    let linktoAgency = "http://localhost:3000/Agency?name=" + this.props.agency.name;
    return (
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col md='auto'>
              <Card border="primary" style={{ width: '40rem' }}>
                <Card.Img variant="top" src="https://via.placeholder.com/200x100" />
                <Card.Header>
                  <Nav variant="pills" defaultActiveKey="#first">
                    <Nav.Link href={linktoAgency}>
                      {this.props.agency.name}
                    </Nav.Link>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col sm><Card.Text>Rating: {this.props.agency.rating}</Card.Text></Col>
                      <Col sm><Card.Text>Address: {this.props.agency.address}</Card.Text></Col>
                    </Row>
                    <Row>
                      <Col sm><Card.Text>Website: {this.props.agency.website}</Card.Text></Col>
                      <Col sm><Card.Text>Email: {this.props.agency.email}</Card.Text></Col>
                    </Row>
                    <Row>
                      <Col sm><Card.Text>Phone: {this.props.agency.phone}</Card.Text></Col>
                      <Col sm><Card.Text>Est: {this.props.agency.est}</Card.Text></Col>
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

class AgencyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agencies: [],
      isLoaded: false
    };
  }
  componentDidMount() {
    if (this.props.enabled) {

    }
  }
  render() {
    const { isLoaded } = this.state;
    if (this.props.enabled == false) {
      return (
        <></>
      );
    }
    else {
      if (!isLoaded) {
        get_all_agencies().then((all_agencies) => {
          this.setState({
            isLoaded: true,
            agencies: all_agencies
          });
        }).catch((err) => {
          console.log(err);
        });
        return (
          <div>
            <h2 className='SignInText' align='center' margin='50'>Loading Local Housing Options</h2>
            <Aload />
          </div>
        );
      }
      else {
        let { agencies } = this.state;
        //console.log("rendered");
        //console.log(agencies);
        const listItems = agencies.map((agency) =>
          <Agency agency={agency} />
        );
        return (
          <div>
            <h1>Agency List</h1>
            {listItems}
          </div>
        );
      }
    }
  }
}


export { Agency, AgencyList };