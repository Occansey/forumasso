import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import logo from './logox.png';
import './Navbar.css';
import Center from './Center';


function Nav() {
  const [pageStates, setPageStates] = useState({
    profilePage: false,
    friendsPage: false,
    publicPage: true,
    privatePage: false,
    userPage: false
  });

  const navigate = (page) => {
    setPageStates((prevStates) => {
      const newStates = { ...prevStates };
      Object.keys(newStates).forEach((key) => {
        if (key !== page) newStates[key] = false;
        else newStates[key] = true;
      });
      return newStates;
    });
  };
  

  return (
    <>
      <Navbar bg="light" expand="lg" className="rounded-navbar">
        <Navbar.Brand href="#home">
          <img src={logo} className="d-inline-block align-top" alt="Logo" />
          {' Organiz Asso'}
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('privatePage')}>Private</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('publicPage')}>Public</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('profilePage')}>Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate('userPage')}>Users</a>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
      <Navbar bg="light" expand="lg" className="rounded-navbar2">
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#link">Logout</a>
              </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
      <Center
        profilePage={pageStates.profilePage}
        friendsPage={pageStates.friendsPage}
        publicPage={pageStates.publicPage}
        privatePage={pageStates.privatePage}
        userPage={pageStates.userPage}
      />
    </>
  );
}

export default Nav;