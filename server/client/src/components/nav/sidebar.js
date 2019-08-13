import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";
import './navstyles.css';

//adjust these links as necessary for routing
function SideBar () {
  return(
    <Menu noOverlay>
      <Link to='/admin/studentlist' className="menu-item" > Students</Link>
      <Link to='/admin/packagelist' className="menu-item" > Packages</Link>
    </Menu>
  )
  }
  
  export default SideBar;