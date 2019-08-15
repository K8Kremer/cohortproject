import React from 'react';
import styled from 'styled-components'

const Title = styled.div`
  text-align: center;
  background-color: #3C5A6B; 
  color: #ffffff; 
  padding-top: 15px; 
  padding-bottom: 15px; 
  background-image: linear-gradient(to bottom right, #1F2F38, #3C5A6B); 
`

const EmployerTitle = () => {
  return (
    <Title className="container-fluid">
      <h1>Alumni Portfolios</h1>
      <hr style={{ height: '0.5px', width: '220px', backgroundColor: "#F2EF50" }}></hr>
      <p>Prepared for employerName, companyName</p>
      <p>by replyName at Project Shift</p>
    </Title>
  )
}

export default EmployerTitle 