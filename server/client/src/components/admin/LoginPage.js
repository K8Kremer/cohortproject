import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import { Redirect } from 'react-router-dom';
// import EmployerHeader from '../nav/EmployerHeader'
import '../../index.css'



const LoginPage = () => {
  //set state for the current component
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errortext, setErrortext] = useState(false);


  function handleLogIn (e) {
    e.preventDefault();
    //if the username and password are correct redirect the user to the next page
    if (username == 'admin' && password == 'password') {
      setRedirect(true);
    } else {
    //if the username and password aren't correct have error text pop up 
      setErrortext(true)
    }
  }
  //c
  function handleUsernameChange (e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange (e) {
    setPassword(e.target.value);
  }

  function renderRedirect () {
    return (
      <div>
      <Redirect to = '/admin' />
      </div>
    )
  }

  function renderErrorText () {
    return (
      <div>
        <p className='error-text'>Invalid Username or Password</p>
      </div>
    )
  }

  return (
    <div className='login-wrapper'>
      <img src = 'https://www.durhamcool.com/wp-content/uploads/2018/04/image-5.jpeg' className='bg'/>
       <div className='img-overlay'>
       </div>
       <div className='container text-center'>
          <img className="img-responsive" style={{ borderRadius: 100, border: '1px solid #9EAEB8', marginBottom: 5 }} src="https://pbs.twimg.com/profile_images/918498674216456193/wlBuJivK.jpg" width="150" height="150" alt=""></img> 
          <h1 className='login-header'>Project Shift</h1>
          <div className='login-box'>
              <input className='col-md-6 login-form' placeholder= "Username" value={username} onChange={handleUsernameChange}></input>
              <br />
              <input className='col-md-6 login-form' placeholder='Password' type='password' value={password} onChange={handlePasswordChange}></input>
          </div>
          <br/>
          {errortext ? renderErrorText() : ''}
          <button style={{backgroundColor: '#f2da52', borderColor: '#f2da52', color: '#3C5B6F'}} className='btn btn-large' onClick={e => handleLogIn(e)}>Sign In</button>
        </div>
        {redirect ? renderRedirect() : '' }
      </div>
  )
};

export default LoginPage;