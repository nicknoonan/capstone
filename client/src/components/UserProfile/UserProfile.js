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
        id: "",
        isLoading: true,
        isToken: true,
    };

    const [user_id, setUser_id] = useState (initialState.user_id);
    const [username, setUsername] = useState (initialState.username);
    const [email, setEmail] = useState (initialState.email);
    const [id, setId] = useState (initialState.id);
    const [isLoading, setIsLoading] = useState (initialState.isLoading);
    const [isToken, setIsToken] = useState (initialState.isToken);

    const localuser = JSON.parse(localStorage.getItem('user'));
    
    // ID param
    // const idParam = localuser.getItem('id');
    const idParam = 0;

    // token param
    // const tokenParam =
    const tokenParam = 0;

    useEffect(() => {
        if (props.user) {
            setIsLoading(false);
        }
        else {
            //console.log("user id param: " + );
            get_user(idParam,tokenParam).then((user) => {
                setUser_id(user.user_id);
                setUsername(user.username);
                setEmail(user.email);
                setId(user._id);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err); 
            });
        }
    }, []);

    // if (isLoading) {
    //     return (
    //         <>
    //             <h3>loading....</h3>
    //         </>
    //     )
    // }
    // else {
        return (
            
    
            <Container>
                
                <Row>
                    <Col>
                        <h1>User Profile</h1>
                        <Form>     
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Label>{username}</Form.Label>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Label>{email}</Form.Label>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
//     }

}

   export default (UserProfile);