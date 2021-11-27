import React from "react";
import '../App.css';
import { Row, Col } from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import { ExternalLink } from 'react-external-link';

function About() {
    return (
        <div>
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
                            }}
                        >
                            <h1 className='pageHeader01'>About Us/Info Page</h1>
                            <h4 className='basicText'>Welcome to Boone Housing Help, a website built by and for students that just want to find the best possible place to live while attending Appalachian State University.</h4>
                            <h4 className='basicText'>This is our information page where you can get familiar with the housing terminology we use on our website to classify/group all of the different housing options.</h4>
                        </Box>

                        <Box>
                            <Row>
                                <Col>
                                    <Box
                                    sx={{
                                        boxShadow: 1,
                                        borderRadius: 1,
                                        p: 2,
                                        minWidth: 300,
                                        margin: 30,
                                        }}
                                    >
                                        <h1 className='boxHeader2'>What is a Agency?</h1>
                                        <h4 className='basicText'>This is the category that we group all of the different housing agencies under. </h4>
                                        <h4 className='qText'>Well what is a housing agency? </h4>
                                        <h4 className='basicText'>A housing agency is a business/company that is run by real estate professionals that specialize in finding properties that customers can buy/rent from. Since this is a website designed to help students find places to rent, not buy, we only include agencies that specialize in local rental properties.</h4>
                                        <h2>Examples:</h2>
                                    </Box>
                                </Col>

                                <Col>
                                    <Box
                                    sx={{
                                        bgcolor: 'rgb(238,238,228)',
                                        boxShadow: 1,
                                        borderRadius: 1,
                                        p: 2,
                                        minWidth: 300,
                                        margin: 30,
                                        }}
                                    >
                                        <h1 className='boxHeader1'>What is a Property?</h1>
                                        <h4 className='basicText'>This is the category that we group all of the housing options that a student could rent from under. On our site properties span from apartment complexes to rental houses. </h4>
                                        <h4 className='qText'>Then what is the difference between a property and a unit?</h4>
                                        <h4 className='basicText'>The property page for a house/apartment complex is where a user can write a review on the rental experience of the house/apartment complex. This page is focused more on reviewing your experiences with the property owner(s)/managers, dealing with maintenance and maintenance orders, or what amenities were apart of your lease. While reviews about specific details on your room/house that you rented from is reserved for the Unit page of the property you rented from.</h4>

                                    </Box>
                                </Col>

                                
                            </Row>

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
                                        }}
                                    >
                                        <h1 className='boxHeader1'>What is a Unit?</h1>
                                        <h4 className='basicText'>A housing Unit refers to specific details about the apartment/room that you lived in while renting from a property. </h4>
                                        <h4 className='basicText'>When searching for the apartment/house that you rented from you will come across the property page for that apartment/house. Then to write a review or read the specific details on the units/rooms/floorplans of that apartment/house you can navigate to the specific unit page that you are looking for. </h4>
                                        <h4 className='basicText'>For apartments we will have all of the different unit options available to view, and for properties like rental houses we will have a page option for each room or however much of the house that is included in the lease agreement. </h4>

                                    </Box>
                                </Col>

                                <Col>
                                    <Box
                                    sx={{
                                        boxShadow: 1,
                                        borderRadius: 1,
                                        p: 2,
                                        minWidth: 300,
                                        margin: 30,
                                        }}
                                    >
                                        <h1 className='boxHeader2'>How do Reviews work?</h1>
                                        <h4 className='basicText'>On our site anyone is allowed to come and view the housing agencies/properties/units that we have on our site. </h4>
                                        <h4 className='qText'>But to be able to write a review for any of those housing options you must create an account and verify that you are a student at Appalachian State University by signing up with your school email (@appstate.edu). </h4>
                                        <ExternalLink className='localLink1' href='http://localhost:3000/signup'>Click here to sign up</ExternalLink> <ExternalLink className='localLink2' href='http://localhost:3000/login'>Click here login</ExternalLink> 

                                        <h4 className='basicText'>This allows us to help build a strong local student community, ensuing that users are only hearing feed back from other students that are in the same situations that they are in.</h4>
                                    </Box>
                                </Col>
                            </Row>
                        </Box>
                    </Col>
                </Row>
            </Box>
        </div>
    );
}

export default About;