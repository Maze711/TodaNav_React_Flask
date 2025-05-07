import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBIcon,
} from 'mdb-react-ui-kit';

export const BottomNav = () => {
  return (
    <>
      <MDBNavbar fixed='bottom' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarNav className='d-flex flex-row justify-content-around w-100'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>
                <MDBIcon fas icon='home' /> Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/payments' className='nav-link'>
                <MDBIcon fas icon='wallet' /> Payments
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/locate' className='nav-link'>
                <MDBIcon fas icon='map-marker-alt' /> Locate
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/messages' className='nav-link'>
                <MDBIcon fas icon='envelope' /> Messages
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/Notif' className='nav-link'>
                <MDBIcon fas icon='bell' /> Notification
              </Link>
            </li>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};