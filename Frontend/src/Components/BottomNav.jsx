import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
} from 'mdb-react-ui-kit';

// Import local PNG icons
import homeIcon from '../assets/ico/home.png';
import walletIcon from '../assets/ico/wallet.png';
import locateIcon from '../assets/ico/location.png';
import chattingIcon from '../assets/ico/chatting.png';
import notificationIcon from '../assets/ico/notification.png';

export const BottomNav = () => {
  return (
    <>
      <MDBNavbar fixed='bottom' light bgColor='light' className='bottom-nav'>
        <MDBContainer fluid>
          <MDBNavbarNav className='d-flex flex-row justify-content-around w-100 align-items-center'>
            <li className='nav-item text-center'>
              <Link to='/' className='nav-link'>
                <img src={homeIcon} alt='Home' className='nav-icon' />
                <div className='nav-text'>Home</div>
              </Link>
            </li>
            <li className='nav-item text-center'>
              <Link to='/payments' className='nav-link'>
                <img src={walletIcon} alt='Payments' className='nav-icon' />
                <div className='nav-text'>Payments</div>
              </Link>
            </li>
            <li className='nav-item text-center'>
              <Link to='/locate' className='nav-link'>
                <img src={locateIcon} alt='Locate' className='nav-icon' />
                <div className='nav-text'>Locate</div>
              </Link>
            </li>
            <li className='nav-item text-center'>
              <Link to='/messages' className='nav-link'>
                <img src={chattingIcon} alt='Messages' className='nav-icon' />
                <div className='nav-text'>Messages</div>
              </Link>
            </li>
            <li className='nav-item text-center'>
              <Link to='/Notif' className='nav-link'>
                <img src={notificationIcon} alt='Notification' className='nav-icon' />
                <div className='nav-text'>Notification</div>
              </Link>
            </li>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};