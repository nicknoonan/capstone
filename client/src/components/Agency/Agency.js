import React from 'react';
import { get_all_agencies } from '../../api/Agency';
import { Card, Nav, Row, Col, Container } from 'react-bootstrap';
import Aload from '../loading/loading';
import '../../App.css';
import { ExternalLink } from 'react-external-link';
import { get_domain } from '../../util';

class Agency extends React.Component {
  render() {
    let linktoAgency = get_domain() + "/Agency?name=" + this.props.agency.name;
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
      this.setState({ agencies, loading: false });
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

class NewAgency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      website: "",
      email: "",
      url: "",
      phone_office: "",
      phone_cell: "",
      fax: "",
      date_est: "",
      card_img_url: "",
      page_img_url: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const class_name = event.target.className;
    const value = event.target.value;
    if (class_name.includes("name")) {
      this.setState({ name: value })
    }
    else if (class_name.includes("address")) {
      this.setState({ address: value });
    }
    else if (class_name.includes("website")) {
      this.setState({ website: value });
    }
    else if (class_name.includes("email")) {
      this.setState({ email: value });
    }
    else if (class_name.includes("card_img_url")) {
      this.setState({ card_img_url: value });
    }
    else if (class_name.includes("page_img_url")) {
      this.setState({ page_img_url: value });
    }
    else if (class_name.includes("url")) {
      this.setState({ url: value });
    }
    else if (class_name.includes("phone_office")) {
      this.setState({ phone_office: value });
    }
    else if (class_name.includes("phone_cell")) {
      this.setState({ phone_cell: value });
    }
    else if (class_name.includes("fax")) {
      this.setState({ fax: value });
    }
    else if (class_name.includes("date_est")) {
      this.setState({ date_est: value });
    }
  }
  handleSubmit(event) {
    console.log("hello")
    const { name, address, website, email, url, phone_office, phone_cell, fax, date_est, card_img_url, page_img_url } = this.state;
    if (name && address && website && email && url && phone_office) {

    }
    else {
      alert("please fill out all required fields");
    }
  }
  render() {
    //name, address, website, email, url, phone_office, phone_cell, fax, date_est, date_created, card_img_url, page_img_url+
    return (
      <div>
        <p1>name: </p1>
        <input className="field name" value={this.state.name} onChange={this.handleInputChange} /><br />
        <p1>address: </p1>
        <input className="field address" value={this.state.address} onChange={this.handleInputChange} /><br />
        <p1>website: </p1>
        <input className="field website" value={this.state.website} onChange={this.handleInputChange} /><br />
        <p1>email: </p1>
        <input className="field email" value={this.state.email} onChange={this.handleInputChange} /><br />
        <p1>url: </p1>
        <input className="field url" value={this.state.url} onChange={this.handleInputChange} /><br />
        <p1>phone_office: </p1>
        <input className="field phone_office" value={this.state.phone_office} onChange={this.handleInputChange} /><br />
        <p1>phone_cell: </p1>
        <input className="field phone_cell" value={this.state.phone_cell} onChange={this.handleInputChange} /><br />
        <p1>fax: </p1>
        <input className="field fax" value={this.state.fax} onChange={this.handleInputChange} /><br />
        <p1>date_est: </p1>
        <input className="field date_est" value={this.state.date_est} onChange={this.handleInputChange} /><br />
        <p1>card_img_url: </p1>
        <input className="field card_img_url" value={this.state.card_img_url} onChange={this.handleInputChange} /><br />
        <p1>page_img_url: </p1>
        <input className="field page_img_url" value={this.state.page_img_url} onChange={this.handleInputChange} />
        <hr />
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}


export { Agency, AgencyList, NewAgency };