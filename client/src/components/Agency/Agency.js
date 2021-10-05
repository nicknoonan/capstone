import React from 'react';
import { Ul, Li } from './AgencyStyles';
import { get_all_agencies } from '../../api/Agency';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Nav, Row, Col, Container
} from 'react-bootstrap';



      
    
class Agency extends React.Component {

  render() {

    let spacetoU = this.props.agency.name;
    spacetoU = spacetoU.replace(/ /g,"_");
    let linktoAgency = "http://localhost:3000/Agency?name=" + this.props.agency.name;
    

    return(
      <>
              <Container>
                
                <Row className="justify-content-md-center">
                  
                  <Col md='auto'>

                  <Card border="primary" style={{width: '40rem'}}> 
                  <Card.Img variant="top" src="https://via.placeholder.com/10x5" />

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
        <Agency agency={agency}/>
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


export { Agency, AgencyList };