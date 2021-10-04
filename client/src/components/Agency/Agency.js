import React from 'react';
import { Ul, Li } from './AgencyStyles';
import get_all_agencies from '../../api/Agency';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Nav, Row, Col
} from 'react-bootstrap';



      
    

class Agency extends React.Component {

  render() {
    return(
      <>
              <Card border="primary" style={{ width: '42rem' }}>
                
              <Card.Img variant="top" src="https://via.placeholder.com/50x25" />

                <Card.Header>
                  
                  <Nav variant="tabs" defaultActiveKey="#first">
                    
                    <Nav.Item>
                      <Nav.Link href="http://localhost:3000/Agency">name: {this.props.agency.name}</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link href="#link">website: {this.props.agency.website}</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link href="#address">{this.props.agency.address}</Nav.Link>
                    </Nav.Item>

                </Nav>
                </Card.Header>

                    

                    <Card.Body>
                    <Card.Text>rating: {this.props.agency.rating}</Card.Text>
                    <Card.Text>email: {this.props.agency.email}</Card.Text>
                    <Card.Text>phone: {this.props.agency.phone}</Card.Text>
                    <Card.Text>est: {this.props.agency.est}</Card.Text>
                    </Card.Body>

                </Card>
                <br />
      </>
      // <div>
      //   <Ul>
      //     <Li><p1>name: {this.props.agency.name}</p1></Li>
      //     <Li><p1>rating: {this.props.agency.rating}</p1></Li>
      //     <Li><p1>address: {this.props.agency.address}</p1></Li>
      //     <Li><p1>website: {this.props.agency.website}</p1></Li>
      //     <Li><p1>email: {this.props.agency.email}</p1></Li>
      //     <Li><p1>phone: {this.props.agency.phone}</p1></Li>
      //     <Li><p1>est: {this.props.agency.est}</p1></Li>
      //   </Ul>        
      // </div>



                // <Card.Text>rating: {this.props.agency.rating}</Card.Text>
                // <Card.Text>address: {this.props.agency.address}</Card.Text>
                // <Card.Text>website: {this.props.agency.website}</Card.Text>
                // <Card.Text>email: {this.props.agency.email}</Card.Text>
                // <Card.Text>phone: {this.props.agency.phone}</Card.Text>
                // <Card.Text>est: {this.props.agency.est}</Card.Text>
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
    get_all_agencies().then((all_agencies) => {
      this.setState({
        isLoaded: true,
        agencies: all_agencies
      });
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>loading agencies...</div>;
    }
    else {
      let { agencies } = this.state;
      console.log("rendered");
      console.log(agencies);
      const listItems = agencies.map((agency) => 
        <li><Agency agency={agency}/></li>
      );
      return (
        <div>
          <h1>Agency List</h1>
          <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 2 }).map((_, idx) => (
              <Col>
                <Card>
                  <ul>{listItems}</ul>
                </Card>
              </Col>
            ))}
          </Row>
           
        </div>
      );
    }
  }
}


export { Agency, AgencyList };