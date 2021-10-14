import React, { useState, useEffect } from 'react';
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import {get_user} from '../../api/User';
import Box from '@material-ui/core/Box';


function UserProfile(props) {
    const initialState = {
        user_id: "",
        username: "",
        email: "",
        verified: false,
        isVerified: false,
        isLoading: true,
    };

    const [user_id, setUser_id] = useState (initialState.user_id);
    const [username, setUsername] = useState (initialState.username);
    const [email, setEmail] = useState (initialState.email);
    const [isLoading, setIsLoading] = useState (initialState.isLoading);
    const [verified, setVerified] = useState (initialState.verified);
    const [isVerified, setIsVerified] = useState (initialState.isVerified);


    const localuser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (props.user) {
            setUser_id(props.user.user_id);
            setUsername(props.user.username);
            setEmail(props.user.email);
            setVerified(props.user.verified);
            setIsVerified(true);
            setIsLoading(false);
        }
        else {
            get_user(localuser.id, localuser.token).then((user) => {
                console.log(user);
                setUser_id(user.data.user_id);
                setUsername(user.data.name);
                setEmail(user.data.email);
                setVerified(user.data.verified);
                if(user.data.verified != true) {
                    setIsVerified(false);
                } else {
                    setIsVerified(true);
                }
                setIsLoading(false);
            }).catch((err) => {
                console.log(err); 
            });
        }
    }, []);


    if (isLoading) {
        return (
            <>
                <h3>loading....</h3>
            </>
        )
    }
    else if(isVerified != true) {
        return (
            <>
                <Box>
                    <Row>
                        <Col>
                            <Box>
                                <h1>User Profile</h1>
                                <Row>
                                    <h4>Username: {username}</h4>
                                </Row>

                                <Row>
                                    <h4>Email: {email}</h4>
                                </Row>

                                <Row>
                                    <h4>Verified Status: Please check your email, you still need to varify your email!</h4> 
                                    <h4>You will not be able to make a review until your account has been verified!</h4>
                                </Row>
                            </Box>
                        </Col>
                    </Row>
                </Box>

                {/* <Container>
                    <Row>
                        <Col>
                            <h1>User Profile</h1>
                            <Form>     
                                <Form.Group>
                                    <Form.Label>Username: {username}</Form.Label>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email: {email}</Form.Label>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Verified Status: Please check your email, you still need to varify your email! You will not be able to make a review until your account has been verified!</Form.Label>                                
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>
                </Container> */}
            </>
        )
    }
    else if (isVerified) {
        return (
            <>
                <Box>
                    <Row>
                        <Col>
                            <Box>
                                <h1>User Profile</h1>
                                <Row>
                                    <h4>Username: {username}</h4>
                                </Row>

                                <Row>
                                    <h4>Email: {email}</h4>
                                </Row>

                                <Row>
                                    <h4>Verified Status: You are verified</h4>
                                </Row>
                            </Box>
                        </Col>
                    </Row>
                </Box>
            </>

            // <Container>
            //     <Row>
            //         <Col>
            //             <h1>User Profile</h1>
            //             <Form>     

            //                 <Form.Group>
            //                     <Form.Label>Username: {username}</Form.Label>
            //                 </Form.Group>

            //                 <Form.Group>
            //                     <Form.Label>Email: {email}</Form.Label>
            //                 </Form.Group>

            //                 <Form.Group>
            //                     <Form.Label>Verified Status: You are verified</Form.Label>
            //                 </Form.Group>

            //             </Form>
            //         </Col>
            //     </Row>
            // </Container>
        )
    }
}

   export default (UserProfile);