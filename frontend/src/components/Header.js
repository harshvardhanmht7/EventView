import React from "react";
import {useNavigate} from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {logout} from '../actions/userAction'
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch=useDispatch()
  const { userInfo } = userLogin;
  const Navigate=useNavigate()


  const logoutHandler=()=>{
    dispatch(logout())
    Navigate('/login')
    
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>EventManagement</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/addEvent">
                <Nav.Link className="fa-solid fa-calendar-check">Add Event</Nav.Link>
                
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to={`profile`}>
                 <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="fas fa-user">Sign In</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
