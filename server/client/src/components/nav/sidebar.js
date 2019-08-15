import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import './navstyles.css';

//adjust these links as necessary for routing
function SideBar () {
  return(
   <div className='wrapper'>
     <nav id='sidebar'>
      <ul className='list-unstyled components'>
        <li className='menu-item'>
          <Link to ={'/admin/studentlist'} className='link'>Students</Link>
        </li>
        <li className='menu-item'>
        <Link to ={'/admin/packagelist'} className='link'>Packages</Link>
        </li>
      </ul>
     </nav>
     <div id='content'>

     </div>
   </div>
  )
  }
  
  export default SideBar;