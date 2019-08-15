import React, { Component } from 'react'
import styled from 'styled-components'

const Card = styled.div`
  //margin-bottom: 30px; 
  //padding-bottom:5px; 
  background: transparent; 
  height: 100%;
  border: #9EAEB8; 
`

const CardImg = styled.img`
  border-radius: 100px;
  border: 1px solid #9EAEB8; 
  marginBottom: 5px; 
  width: 150px;
  height: 150px; 
`

class EmployerCard extends Component {

  render() {
    return (
      <div className="col-md-4 col-sm-6" key={this.props.cardId} style={{ marginBottom: 15 }}>
        <Card className="card">
          <div className="views-row" style={{ padding: 15, textAlign: 'center' }}>
            <div className=" ">
              <CardImg className="img-responsive" src="https://pbs.twimg.com/profile_images/918498674216456193/wlBuJivK.jpg" alt=""></CardImg>
            </div>
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
            <div className=" " style={{ color: '#3C5A6B', backgroundColor: 'transparent' }}>
              <a className="btn btn-primary btn-ghost hidden-xs" style={{ color: '#3C5A6B', borderColor: '#3C5A6B', backgroundColor: 'transparent' }} href="/employer/0">See Full Profile</a>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default EmployerCard 
