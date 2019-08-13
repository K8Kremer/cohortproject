import React from 'react';
import { slide as Menu } from "react-burger-menu";
import './navstyles.css';

//adjust these links as necessary for routing
function SideBar () {
  return(
    <Menu noOverlay>
      <a className="menu-item" href="admin/studentlist"> Students</a>
      
      <a className="menu-item" href="admin/packagelist">Packages</a>
    </Menu>
  )
  }
  
  export default SideBar;