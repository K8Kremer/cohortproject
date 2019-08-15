import React from 'react';
import EmployerHeader from '../nav/EmployerHeader';

import styled from 'styled-components'

const Title = styled.div`
  text-align: center;
  background-color: #3C5A6B; 
  color: #ffffff; 
  padding-top: 15px; 
  padding-bottom: 15px; 
  background-image: linear-gradient(to bottom right, #1F2F38, #3C5A6B); 
`

const Note = styled.div`
  background-color: #ffffff; 
  color: #3C5A6B; 
  padding: 15px 15px 0 15px; 
  margin: 15px; 
  border: 1px solid #3C5A6B;
  border-radius: 0.25rem;
`

const Card = styled.div`
  //margin-bottom: 30px; 
  //padding-bottom:5px; 
  background: transparent; 
  height: 100%;
  border: #9EAEB8; 
`

const EmployerView = () => {
  return (
    <div>
      <EmployerHeader />
      <Title className="container-fluid">
        <h1>Alumni Portfolios</h1>
        <hr style={{ height: '0.5px', width: '220px', backgroundColor: "#F2EF50" }}></hr>
        <p>Prepared for employerName, companyName</p>
        <p>by replyName at Project Shift</p>
      </Title>
      <div className="container-fluid">
        <Note>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Note>
      </div>
      <div className="container-fluid">
      <div className="row" style={{margin: 0}}>
      <div className="col-md-4 col-sm-6" key='card0' style={{ marginBottom: 15}}>
          <Card className="card">
          <div className="views-row" style={{ padding: 15, textAlign: 'center' }}>
            <div className=" ">
                <img className="img-responsive" style={{ borderRadius: 100, border: '1px solid #9EAEB8', marginBottom: 5 }} src="https://pbs.twimg.com/profile_images/918498674216456193/wlBuJivK.jpg" width="150" height="150" alt=""></img>            </div>
            <div className=" ">
              <h4 className=" ">FirstName LastName</h4>
            </div>
            <div className=" ">
              <div className=" ">Software Engineer</div>
            </div>
            <div className=" ">
              <span className=" "><hr></hr></span>
            </div>
            <div className=" ">
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <div className=" " style={{color: '#3C5A6B', backgroundColor: 'transparent'}}>
              <a className="btn btn-primary btn-ghost hidden-xs" style={{color: '#3C5A6B', borderColor: '#3C5A6B', backgroundColor: 'transparent'}} href="/employer/0">See Full Profile</a>
            </div>
          </div>
          </Card>
        </div>

        <div className="col-md-4 col-sm-6" key='card1' style={{ marginBottom: 15}}>
          <Card className="card">
          <div className="views-row" style={{ padding: 15, textAlign: 'center' }}>
            <div className=" ">
                <img className="img-responsive" style={{ borderRadius: 100, border: '1px solid #9EAEB8', marginBottom: 5 }} src="https://pbs.twimg.com/profile_images/918498674216456193/wlBuJivK.jpg" width="150" height="150" alt=""></img>            </div>
            <div className=" ">
              <h4 className=" ">FirstName LastName</h4>
            </div>
            <div className=" ">
              <div className=" ">Software Engineer</div>
            </div>
            <div className=" ">
              <span className=" "><hr></hr></span>
            </div>
            <div className=" ">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. 
              </p>
            </div>
            <div className=" " style={{color: '#3C5A6B', backgroundColor: 'transparent'}}>
              <a className="btn btn-primary btn-ghost hidden-xs" style={{color: '#3C5A6B', borderColor: '#3C5A6B', backgroundColor: 'transparent'}} href="/employer/0">See Full Profile</a>
            </div>
          </div>
          </Card>
        </div>

        <div className="col-md-4 col-sm-6" key='card2' style={{ marginBottom: 15}}>
          <Card className="card">
          <div className="views-row" style={{ padding: 15, textAlign: 'center' }}>
            <div className=" ">
                <img className="img-responsive" style={{ borderRadius: 100, border: '1px solid #9EAEB8', marginBottom: 5 }} src="https://pbs.twimg.com/profile_images/918498674216456193/wlBuJivK.jpg" width="150" height="150" alt=""></img>            </div>
            <div className=" ">
              <h4 className=" ">FirstName LastName</h4>
            </div>
            <div className=" ">
              <div className=" ">Software Engineer</div>
            </div>
            <div className=" ">
              <span className=" "><hr></hr></span>
            </div>
            <div className=" ">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
            </div>
            <div className=" " style={{color: '#3C5A6B', backgroundColor: 'transparent'}}>
              <a className="btn btn-primary btn-ghost hidden-xs" style={{color: '#3C5A6B', borderColor: '#3C5A6B', backgroundColor: 'transparent'}} href="/employer/0">See Full Profile</a>
            </div>
          </div>
          </Card>
        </div>

      </div>
      </div>

    </div>
  )
};

export default EmployerView;
