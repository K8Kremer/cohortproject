import React from 'react';
import './navstyles.css'

function PageHeader () {
return(

<nav className="navbar navbar-light" id='sticky' >
  <a className="nabar-brand" href="/">
    <img style={{marginLeft: 10, verticalAlign: 'baseline' }}src="https://www.projectshift.io/wp-content/uploads/2018/09/Asset-5@200x-3.png" width="200" height="49px" 
      className="d-inline-block align-top" ></img>
  </a>
</nav>

)
}

export default PageHeader;