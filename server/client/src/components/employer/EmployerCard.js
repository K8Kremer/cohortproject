import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

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

const EmployerCard = ({ student = {}, studentNotes = '', packageId = '' }) => {

  return (
    <div className="col-md-4 col-sm-6" style={{ marginBottom: 15 }}>
      <Card className="card">
        <div className="views-row" style={{ padding: 15, textAlign: 'center' }}>
          <div className=" ">
            <CardImg className="img-responsive" src={student.picture || "https://pbs.twimg.com/profile_images/918498674216456193/wlBuJivK.jpg"} alt=""></CardImg>
          </div>
          <div className=" ">
            <h4 className=" ">{student.firstName} {student.lastName}</h4>
          </div>
          <div className=" ">
            <div className=" ">{student.typeOfWorkDesired} Software Engineer</div>
          </div>
          <div className=" ">
            <span className=" "><hr></hr></span>
          </div>
          <div className=" ">
            <p>
              {studentNotes || student.bio || ''}
            </p>
          </div>
          <div className=" " style={{ color: '#3C5A6B', backgroundColor: 'transparent' }}>
            <Link className="btn btn-primary btn-ghost hidden-xs" style={{ color: '#3C5A6B', borderColor: '#3C5A6B', backgroundColor: 'transparent' }} to={`/employer/${packageId}/student/${student._id}`}>See Full Profile</Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default EmployerCard 
