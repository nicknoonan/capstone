import { get_agency_by_name } from '../api/Agency';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Row, Col, Container } from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import { ExternalLink } from 'react-external-link';
import Aload from '../components/loading/loading';
import ReviewButton from '../components/ReviewButton/ReviewButton';
import { ReviewResult, ReviewResultList } from '../components/Review/ReviewResult';

function Agency(props) {
  const initialState = {
    name: "",
    website: "",
    url: "",
    address: "",
    rating: 0,
    email: "",
    phone: "",
    est: "",
    id: "",
    isLoading: true,
    im_url02: "",
    cell_phone: "",
    fax: "",
    // isError: false
  };
//  let errorMessage = '';
  const [name, setName] = useState(initialState.name);
  const [website, setWebsite] = useState(initialState.website);
  const [address, setAddress] = useState(initialState.address);
  const [rating, setRating] = useState(initialState.rating);
  const [email, setEmail] = useState(initialState.email);
  const [phone, setPhone] = useState(initialState.phone);
  const [est, setEst] = useState(initialState.est);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [id, setId] = useState(initialState.id);
  const [im_url02, setIm_url02] = useState(initialState.im_url02);
  const [cell_phone, setCell_phone] = useState(initialState.cell_phone);
  const [fax, setFax] = useState(initialState.fax);
  const [url, setUrl] = useState(initialState.url);

//   const [isError, setError] = useState(initialState.isError);
  const search = useLocation().search;
  const nameParam = new URLSearchParams(search).get('name');
  useEffect(() => {
    if (props.agency) {
      setIsLoading(false);
    }
    else {
      //get agency name from url
      //parse agency name
      //make api call using get_agency_by_name()
      //get_agency_by_name returns a promise
      //getagency().then().catch();
      //handle loading state
      //console.log("name param: " + nameParam);
      get_agency_by_name(nameParam).then((agency) => {
        setName(agency.name);
        setWebsite(agency.website);
        setAddress(agency.address);
        setRating(agency.rating);
        setEmail(agency.email);
        setPhone(agency.phone_office);
        setEst(agency.est);
        setId(agency._id);
        setIsLoading(false);
        setIm_url02(agency.page_img_url);
        setCell_phone(agency.phone_cell);
        setFax(agency.fax);
        setUrl(agency.url);
        // setError(false);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);
 

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
        <img className='fImage' src={im_url02}></img>
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
            </Box>

            <Row>
                <Box
                  sx={{
                    margin: 30,
                    }}>

                  <ReviewButton review_of_id={id} type={"agency_t"} entity_name={name}/>

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
            <h3 className='APULowLevelHeader'>Office Phone: {phone}</h3>
            <h3 className='APULowLevelHeader'>Cell Phone: {cell_phone}</h3>
            <h3 className='APULowLevelHeader'>Fax: {fax}</h3>
            </Box>

            <Row>
              <Box>
                <ReviewResultList list_type={"agency_t"} review_of_id={id}/>
              </Box>
            </Row>

          </Col>
          </Row>
          
        </Box>
      </>
    );
  }
}

export default Agency