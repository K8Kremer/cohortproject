import React, { Fragment } from "react";
import EmployerHeader from '../nav/EmployerHeader';
import EmployerTitle from '../employer/EmployerTitle';
import { Link } from 'react-router-dom';

const EmployerStudentView = () => {
  return (
    <Fragment>
      <EmployerHeader />
      <EmployerTitle />
      <div className="container-fluid">
        <div className="row mt-4 mb-4 ml-4">
          <div>
            <Link
            to={`/employer/:packageId }`}> {`<< `}Back to Students
            </Link>
          </div>
        </div>
        <div className="row ml-4 mr-4 mb-5" style={{borderStyle: 'ridge', minHeight: 400, minWidth: 270}}>
          <div className='col-sm-3' style={{backgroundColor: '#3C5A6B', alignContent:"center", minWidth: 250}}>
            
              <div className=" mt-4 pt-5 mx-auto" style={{backgroundColor: '#E8E8E8', height:150, width:150}}>
                <div className="m-1" align="center">photo</div>

              </div>
              <div className="mb-4 mt-4 text-center">
                <h4 style={{color: 'white'}}>First/Last Name</h4>
                <div style={{color: 'white'}}>
                <p>job-seeking status</p>
                <p>contact info</p>
                <p>links( as icons?)</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 pt-4 pl-3" style={{Color: '#3C5A6B'}}>
              <div className="mb-4">Student Details [row with cards in columns]</div>
              <div className="mb-4">bio </div>
              <div className="mb-4">industries</div>
              <div className="mb-4">specialization (front-end, back-end, full-stack) </div>
              <div className="mb-4">location preferences </div>
              <div className="mb-4">link to view/download resume? etc. </div>
              </div></div>
      </div>
      <div className="container">
        
      </div>
    </Fragment>
  )
};

export default EmployerStudentView;