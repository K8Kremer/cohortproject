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

const EmployerNote = ({ packageNotes = '' }) => {
  if (!packageNotes) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-md-center" style={{ margin: 0 }}>
          <div className="col-md-6">
            <p>
            </p>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container-fluid">
        <div className="row justify-content-md-center" style={{ margin: 0 }}>
          <Note className="col-md-6">
            <p>
              {packageNotes}
            </p>
          </Note>
        </div>
      </div>
    )
  }
}

export default EmployerNote 