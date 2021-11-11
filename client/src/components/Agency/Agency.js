import React from 'react';
import { get_all_agencies } from '../../api/Agency';
import { Card, Nav, Row, Col, Container} from 'react-bootstrap';
import Aload from '../loading/loading';
import '../../App.css';
import { ExternalLink } from 'react-external-link';


class Agency extends React.Component {
  render() {
    let linktoAgency = "http://localhost:3000/Agency?name=" + this.props.agency.name;
    return (
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col md='auto'>
              <Card border="primary" style={{ width: '40rem' }}>
                <Card.Img variant="top" src={this.props.agency.card_img_url} />
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
                      <Col sm><Card.Text>Website: <ExternalLink href={this.props.agency.url}>{this.props.agency.website}</ExternalLink></Card.Text></Col>
                      <Col sm><Card.Text>Email: {this.props.agency.email}</Card.Text></Col>
                    </Row>
                    <Row>
                      <Col sm><Card.Text>Office Phone: {this.props.agency.phone_office}</Card.Text></Col>
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
      loading: true
    };
  }
  componentDidMount() {
    if (this.props.agencies) {
      console.log(this.props.agencies);
      let agencies = this.props.agencies;
      this.setState({agencies, loading: false});
    }
    else {
      get_all_agencies().then((all_agencies) => {
        this.setState({
          loading: false,
          agencies: all_agencies
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