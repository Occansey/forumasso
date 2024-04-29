import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from './logox.png' 
import './Navbar.css'

function Nav(props){
    return(
      <>
        <Navbar bg="light" expand="lg" className="rounded-navbar">
        <Navbar.Brand href="#home">
        <img src={logo} className="d-inline-block align-top" alt="Logo"/>
        {' Organiz Asso'}</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home">Top</a>
            </li>
            {props.admin ?(
            <li className="nav-item">   
              <a className="nav-link" href="#link">Admin</a>
            </li>):(<li className="nav-item">   
              <a className="nav-link" href="#link">Public</a>
            </li>)}
            <li className="nav-item">   
              <a className="nav-link" href="#link">Profile</a>
            </li>
            <li className="nav-item">   
              <a className="nav-link" href="#link">Friends</a>
            </li>
          </ul>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
      <Navbar bg="light" expand="lg" className="rounded-navbar2">
      <Navbar.Collapse id="basic-navbar-nav">
      <ul className="navbar-nav ml-auto">
      {props.connected ? (
            <li className="nav-item">   
              <a className="nav-link" href="#link">Login</a>
            </li>):(
            <li className="nav-item">   
              <a className="nav-link" href="#link">Logout</a>
            </li>
      )}
      </ul>
      </Navbar.Collapse>   
      </Navbar>
      </>
      );

}

export default Nav  