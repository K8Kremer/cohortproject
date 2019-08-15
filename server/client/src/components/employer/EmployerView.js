import React, { Component, Fragment } from "react";
import styled from 'styled-components'

import EmployerHeader from '../nav/EmployerHeader';
import EmployerCard from './EmployerCard';

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

class EmployerView extends Component {

  renderList() {
    const test = [0, 1, 2, 3, 4, 5];
    return test.map((i) => {
      return (
        <EmployerCard key={i} cardId={i} />
      )
    })
  }

  render() {
    return (
      <Fragment>
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
          <div className="row" style={{ margin: 0 }}>
            {this.renderList()}
          </div>
        </div>
      </Fragment>
    )
  }
};

export default EmployerView;
