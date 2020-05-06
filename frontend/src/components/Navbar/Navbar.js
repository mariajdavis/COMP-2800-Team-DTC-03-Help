import React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'


const toolbar = props => (
    <Navbar style={{backgroundColor:"#2743A5"}} expand="sm">
      <Navbar.Brand class="navBrand" id="navBrand" style={{fontFamily:"Racing Sans One", color:"white", fontSize:"30px"}}>help!</Navbar.Brand>
    <Navbar.Toggle id="collapseButton" aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link id="navLink" href="/logIn">Log In</Nav.Link>
        <Nav.Link id="navLink" href="/register">Register</Nav.Link>
        <Nav.Link id="navLink" href="/jobPosts">Job Board</Nav.Link>
        <Nav.Link id="navLink" href="/add">Add Job</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  
    
);

export default toolbar;