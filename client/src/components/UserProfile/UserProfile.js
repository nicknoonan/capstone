import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {get_user} from '../../api/User';


function UserProfile(props) {
    const initialState = {
        user_id: "",
        username: "",
        email: "",
        verified: "",
        isverified: false,
        isLoading: true,
    };

    const [user_id, setUser_id] = useState (initialState.user_id);
    const [username, setUsername] = useState (initialState.username);
    const [email, setEmail] = useState (initialState.email);
    const [isLoading, setIsLoading] = useState (initialState.isLoading);
    const [verified, setVarMes] = useState (initialState.verified);
    const [isverified, setVerified] = useState (initialState.isverified);


    const localuser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (props.user) {
            setUser_id(props.user.user_id);
            setUsername(props.user.username);
            setEmail(props.user.email);
            setVarMes(props.user.verified);
            setVerified(true);
            setIsLoading(false);
        }
        else {
            get_user(localuser.id, localuser.token).then((user) => {
                console.log(user);
                setUser_id(user.data.user_id);
                setUsername(user.data.name);
                setEmail(user.data.email);
                setVarMes(user.data.verified);
                setVerified(true);
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
    else if(isverified != false) {
        return (
            <>
                <Container>
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
                                    <Form.Label>Verified Status: Need to varify your email!</Form.Label>
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
    else if (isverified) {
        return (
            <Container>
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
                                <Form.Label>Verified Status: You are verified</Form.Label>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

   export default (UserProfile);