import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserContext from '../context/UserContext.js';

export default function AppNavbar() {
    const { user } = useContext(UserContext);
    console.log("User context:", JSON.stringify(user, null, 2));

    return (
        <Navbar expand="lg" className='bg-primary'>
            <Container>
                <Navbar.Brand as={NavLink} to="/" className='text-light'>Zuit Workout</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <Nav.Link as={NavLink} to="/" exact="true" className='text-light'>Home</Nav.Link>
                        {user && user.id ? (  
                            <>
                                <Nav.Link as={NavLink} to="/workouts" exact="true" className='text-light'>Workout</Nav.Link>
                                <Nav.Link as={NavLink} to="/addWorkout" exact="true" className='text-light'>Add Workout</Nav.Link>
                                <Nav.Link as={NavLink} to="/logout" exact="true" className='text-light'>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" exact="true" className='text-light'>Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" exact="true" className='text-light'>Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
