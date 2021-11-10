import { get_property_by_name } from '../api/Property';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
//import EntityReview from '../components/Review/EntityReview'
import ReviewButton from '../components/ReviewButton/ReviewButton';
import Aload from '../components/loading/loading';
import { ExternalLink } from 'react-external-link';
import Box from '@material-ui/core/Box';
import { Row, Col, Nav } from 'react-bootstrap';
import '../App.css';

function Property(props) {
  const initialState = {
    name: "",
    agencyName: "",
    website: "",
    address: "",
    rating: 0,
    email: "",
    phoneOffice: "",
    est: "",
    id: "",
    isLoading: true,
    url: "",
    card_image: "",
    page_image: "",
    // isError: false
  };
//  let errorMessage = '';
  const [name, setName] = useState(initialState.name);
  const [website, setWebsite] = useState(initialState.website);
  const [address, setAddress] = useState(initialState.address);
  const [rating, setRating] = useState(initialState.rating);
  const [email, setEmail] = useState(initialState.email);
  const [phoneOffice, setPhoneOffice] = useState(initialState.phoneOffice);
  const [est, setEst] = useState(initialState.est);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [id, setId] = useState(initialState.id);
  const [agencyName, setAgencyName] = useState(initialState.agencyName);
  const [url, setUrl] = useState(initialState.agencyName);
  const [card_image, setCard_image] = useState(initialState.card_image);
  const [page_image, setPage_image] = useState(initialState.page_image);


//   const [isError, setError] = useState(initialState.isError);
  const search = useLocation().search;
  const nameParam = new URLSearchParams(search).get('name');
  useEffect(() => {
    if (props.property) {
      setIsLoading(false);
    }
    else {
      console.log("name param: " + nameParam);
      get_property_by_name(nameParam).then((property) => {
        setName(property.name);
        setWebsite(property.website);
        setAddress(property.address);
        setRating(property.rating);
        setEmail(property.email);
        setPhoneOffice(property.phone_office);
        setEst(property.est);
        setId(property._id);
        setIsLoading(false);
        setAgencyName(property.agency_name);
        setUrl(property.url);
        setCard_image(property.im_url01);
        setPage_image(property.im_url02);
        // setError(false);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);
 
  let linktoAgency = "http://localhost:3000/Agency?name=" + agencyName;

  if (isLoading) {
    return (
      <div>
        <h2 className='SignInText' align='center' margin='50'>Loading Local Housing Options</h2>
        <Aload />
      </div>
    );
  }
//   else if(isError) {
//       <>
//         <h3>Error Message</h3>
//       </>
//   }
  else {
    return (
      <>
        <img className='fImage' src={page_image}></img>
        <Box>
          <Row>
          <Col>
            <Box 
            sx={{
              bgcolor: 'rgb(238,238,228)',
              boxShadow: 1,
              borderRadius: 1,
              p: 2,
              minWidth: 300,
              margin: 30,
              }}>

              <h2 className='APUName'>{name}</h2>
              <h3 className='APULowLevelHeader'>Website: <ExternalLink className='websiteLink' href={url}>{website}</ExternalLink></h3>
              <h3 className='APULowLevelHeader'>Address: {address}</h3>
              <h3 className='APULowLevelHeader'>Housing Agency: <ExternalLink className='websiteLink' href={linktoAgency}>{agencyName}</ExternalLink></h3>
            </Box>

            <Row>
                <Box
                sx={{
                  margin: 30,
                  }}
                >
                    <ReviewButton review_of_id={id} type={"property_t"} entity_name={name}/>
                </Box>
            </Row>
          </Col>

          <Col>
            <Box
            sx={{
              boxShadow: 1,
              borderRadius: 1,
              p: 2,
              minWidth: 300,
              margin: 30,
              }}>
            <h2 className='APUName'>Contact Info:</h2>
            <h3 className='APULowLevelHeader'>Email: {email}</h3>
            <h3 className='APULowLevelHeader'>Office Phone: {phoneOffice}</h3>
            {/* <h3 className='APULowLevelHeader'>Cell Phone: {cell_phone}</h3>
            <h3 className='APULowLevelHeader'>Fax: {fax}</h3> */}
            </Box>

            <Row>
              <Box>
                {/* HERE THE LIST OF REVIEWS WILL GO */}
              </Box>
            </Row>

          </Col>
          </Row>
          
        </Box>
      </>
    );
  }
}

export default Property

