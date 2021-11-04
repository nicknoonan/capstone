import { get_unit_by_name } from '../api/Unit';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Aload from '../components/loading/loading';
import { ExternalLink } from 'react-external-link';
import Box from '@material-ui/core/Box';
import '../App.css';
import ReviewButton from '../components/ReviewButton/ReviewButton';

function Unit(props) {
  const initialState = {
    name: "",
    agencyName: "",
    propertyName: "",
    floorplan: "",
    cost: "",
    page_image: "",
    isLoading: true,
    id: ""
    // isError: false
  };

//  let errorMessage = '';
  const [name, setName] = useState(initialState.name);
  const [agencyName, setAgencyName] = useState(initialState.agencyName);
  const [propertyName, setPropertyName] = useState(initialState.propertyName);
  const [floorplan, setFloorplan] = useState(initialState.floorplan);
  const [cost, setCost] = useState(initialState.cost);
  const [page_image, setPage_image] = useState(initialState.page_image);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [id, setId] = useState(initialState.id);
//   const [isError, setError] = useState(initialState.isError);
  
  const search = useLocation().search;
  const nameParam = new URLSearchParams(search).get('name');

  useEffect(() => {
    if (props.unit) {
      setIsLoading(false);
    }
    else {
      //console.log("name param: " + nameParam);
      get_unit_by_name(nameParam).then((unit) => {
        setName(unit.name);
        setAgencyName(unit.agency_name);
        setPropertyName(unit.property_name);
        setFloorplan(unit.Floorplans.Unit_A);
        setCost(unit.Floorplans_Price.Unit_A);
        setPage_image(unit.page_image);
        setId(unit._id);
        setIsLoading(false);
        // setError(false);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);
 

  let linktoAgency = "http://localhost:3000/Agency?name=" + agencyName;
  let linktoProperty = "http://localhost:3000/Property?name=" + propertyName;


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
              <h3 className='APULowLevelHeader'>Housing Agency: <ExternalLink className='websiteLink' href={linktoAgency}>{agencyName}</ExternalLink></h3>
              <h3 className='APULowLevelHeader'>Housing Property: <ExternalLink className='websiteLink' href={linktoProperty}>{propertyName}</ExternalLink></h3>
            </Box>

            <Row>
                <Box
                sx={{
                  margin: 30,
                  }}
                >
                    <ReviewButton review_of_id={id} type={"unit_t"} entity_name={name}/>
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
            <h2 className='APUName'>Unit Info:</h2>
            <h3 className='APULowLevelHeader'>Unit List: {floorplan}</h3>
            <h3 className='APULowLevelHeader'>Price: {cost}</h3>
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

    // return (
    //   <>
    //     <h1 className='infoPage'>{name}</h1>;
    //     <Container>
    //       <Col>

    //         <Row>
    //           <h3>{website}</h3>
    //           <h3>{address}</h3>
    //         </Row>

    //         {/* <Row>
    //           <h3>{address}</h3>
    //         </Row> */}

    //       </Col>

    //       <Col>
          
    //         <Row>
    //           <h3>{email}</h3>
    //         </Row>

    //         <Row>
    //          <h3>{phone}</h3>
    //         </Row>

    //         <Row>
    //         <h3>{rating}</h3>
    //         </Row>
    //       </Col>
    //     </Container>
    //     {/*<UnitReview unit_id={id} unit_name={name}/>*/}
    //     {/*<EntityReview type={"unit_t"} review_of_id={id} entity_name={name} />*/}
    //     <ReviewButton review_of_id={id} type={"unit_t"} entity_name={name}/>
    //   </>
    // );
  }
}

export default Unit
