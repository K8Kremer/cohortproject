import React from 'react';
import styled from 'styled-components'

const Note = styled.div`
  background-color: #ffffff; 
  color: #3C5A6B; 
  padding: 15px 15px 0 15px; 
  margin: 15px; 
  border: 1px solid #3C5A6B;
  border-radius: 0.25rem;
`

const EmployerNote = () => {
  return (
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
  )
}

export default EmployerNote 