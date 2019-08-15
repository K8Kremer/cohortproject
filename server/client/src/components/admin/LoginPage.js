import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import { Redirect } from 'react-router-dom';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);


  function handleLogIn (e) {
    e.preventDefault();
    if (username == 'admin' && password == 'password') {
      setRedirect(true);
    }
  }

  function handleUsernameChange (e) {
    console.log(e.target.value)
    setUsername(e.target.value);
  }

  function handlePasswordChange (e) {
    console.log(e);
    setPassword(e.target.value);
  }

  function renderRedirect () {
    return (
      <div>
      <Redirect to = '/admin' />
      </div>
    )
  }

  return (
    <div>
      <h1>Project Shift</h1>
      <form>
       <Row>
         <input value={username} onChange={handleUsernameChange}></input>
       </Row>
       <Row>
         <input type='password' value={password} onChange={handlePasswordChange}></input>
       </Row>
        <button className='btn' onClick={e => handleLogIn(e)}>Sign In</button>
      </form>
      {redirect ? renderRedirect() : '' }
    </div>
  )
};

export default LoginPage;