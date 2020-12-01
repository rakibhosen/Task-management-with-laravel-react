import React,{useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Header = () => {
    const [PublicURL,setPublicURL]=useState("/laratask/");
    return (  
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>

                
                <Link to={`${PublicURL}`}>
                    <Navbar.Brand >Task Management</Navbar.Brand>
                    </Link>
              

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">

                   
                    <Link to={`${PublicURL}`}> 
                    <Nav.Item className="text-white mr-2"> Home  </Nav.Item>
                    </Link>
                  

                     
                    <Link to={`${PublicURL}about`}>
                        <Nav.Item className="text-white mr-2">About</Nav.Item> 
                    </Link>
           

                   
                    <Link to={`${PublicURL}contact`}> 
                    <Nav.Item className="text-white mr-2"> Contact </Nav.Item>
                    </Link>
     

                    <Link to={`${PublicURL}projects`}> 
                    <Nav.Item className="text-white mr-2"> Projects </Nav.Item>
                    </Link>
                   
                </Nav>

                <Nav className="ml-auto">

                <Link to={`${PublicURL}login`}> 
                    <Nav.Item className="text-white mr-2"> SignIn</Nav.Item>
                </Link>

                <Link to={`${PublicURL}register`}> 
                    <Nav.Item className="text-white mr-2"> Signup</Nav.Item>
                </Link>

                </Nav>
                </Navbar.Collapse>
            </Container>
      </Navbar>
    );
};
 
export default Header;