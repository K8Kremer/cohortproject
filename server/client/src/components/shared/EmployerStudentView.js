import React, { Component, Fragment } from "react";
import EmployerHeader from '../nav/EmployerHeader';
import EmployerTitle from '../employer/EmployerTitle';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPackage } from '../../actions';
import { bindActionCreators } from 'redux';
import styled from 'styled-components'

const CardImg = styled.img`
  border-radius: 100px;
  // border: 1px solid #9EAEB8; 
  margin-bottom: 5px; 
  width: 150px;
  height: 150px; 
`

class EmployerStudentView extends Component {

  componentDidMount() {
    this.props.fetchPackage(this.props.packageId);
  }

  renderStudent() {
    if (this.props.package.students.length === 0) {
      return (
        <div>loading...</div>
      )
    } else {
      let studentObject = this.props.package.students.find(studentObject =>
        studentObject.student._id === this.props.studentId)
      return (
        <div className="row ml-4 mr-4 mb-5" style={{ borderStyle: 'ridge', minHeight: 400, minWidth: 270 }}>
            <div className='col-sm-3' style={{ backgroundColor: '#3C5A6B', alignContent: "center", minWidth: 250 }}>
              <div className=" mt-4  mx-auto" style={{ backgroundColor: '#3C5A6B', height: 150, width: 150, paddingTop: 0 }}>
              <CardImg className="img-responsive" src={studentObject.student.picture || "https://pbs.twimg.com/profile_images/918498674216456193/wlBuJivK.jpg"} alt=""></CardImg>
              </div>
              <div className="mb-4 mt-4 text-center">
                <h4 style={{ color: 'white' }}>{studentObject.student.firstName} {studentObject.student.lastName}</h4>
                <div style={{ color: 'white' }}>
                  <p>Job-seeking status: {studentObject.student.jobSeekingStatus}</p>
                  <p>Contact: {studentObject.student.email} </p>
                  <p>{studentObject.student.phone} </p>
                  <p>{studentObject.student.linkedIn}, {studentObject.student.projectRepoLink}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 pt-4 pl-3" style={{ Color: '#3C5A6B' }}>
              <div className="mb-4">Student Details </div>
              <div className="mb-4">Bio: {studentObject.student.bio} </div>
              <div className="mb-4">Industry: {studentObject.student.industriesPreferred[0]}</div>
              <div className="mb-4">Specialization: {studentObject.student.typeOfWorkDesired} </div>
              <div className="mb-4">location preferences </div>
              <div className="mb-4">link to view/download resume?  </div>
            </div>
          </div>
      )
    }
  }

  render() {
    if (Object.keys(this.props.package).length === 0) {
      return (
        <Fragment>
          <EmployerHeader />
          <EmployerTitle />
        </Fragment>
      )
    }

    return (
      <Fragment>
        <EmployerHeader />
        <EmployerTitle employerName={this.props.package.employerName} companyName={this.props.package.companyName} replyName={this.props.package.replyName} />
        <div className="container-fluid">
          <div className="row mt-4 mb-4 ml-4">
            <div>
              <Link
                to={`/employer/${this.props.packageId}`}> {`<< `}Back to Students
            </Link>
            </div>
          </div>
          {this.renderStudent()}
        </div>
        <div className="container">
        </div>
      </Fragment>
    )
  }
};

function mapStateToProps(state, ownProps) {
  return {
    packageId: ownProps.match.params.packageId,
    studentId: ownProps.match.params.studentId,
    package: state.current_package
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPackage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerStudentView);