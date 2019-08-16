import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import './navstyles.css';

//adjust these links as necessary for routing
const SideBar = () => (
  <div>
  <nav id='sidebar'>
    <div>
    <ul className='list-unstyled components mt-5'>
      <li className='menu-item'>
        <Link to ={'/admin/studentlist'} className='link'>Students</Link>
      </li>
      <li className='menu-item'>
        <Link to ={'/admin/packagelist'} className='link'>Packages</Link>
      </li>
    </ul>
    </div>
  </nav>
  </div>
);
  
export default SideBar;