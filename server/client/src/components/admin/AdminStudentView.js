import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudent } from '../../actions';
import { bindActionCreators } from 'redux';


  class AdminStudentView extends Component {
    componentDidMount() {
      this.props.fetchStudent("5d52d7ca9c840b774c6b7e5f")
    }
  
    //hardcoded student id for testing purposes
    handleClick = (event) => {
      this.props.fetchStudent("5d52d7ca9c840b774c6b7e5f");
    }
  
    render(){
   
      return (
        //placeholder button until list gets populated and we can move onClick to student row
        <div>
        <button btn btn-primary onClick={this.handleClick}>Placeholder for GET Student</button>
        
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              {/* <img src={this.props.current_student.picture.thumbnail}></img> */}
              </div>
            <div className='col-6'>
             {/* <p><b>Last Name:</b> {name}</p> */}
             {/* <p><b>First Name:</b> {this.props.current_student.name['last']}</p> */}
              <p><b>Job Seeking Status:</b> {this.props.current_student.jobSeekingStatus}</p>
              <p><b>Project Repos:</b></p>
              <p><b>Bio:</b> {this.props.current_student.bio}</p>
              <p><b>Resume:</b> {this.props.current_student.resume}</p>
              <p><b>Location Preference:</b> {this.props.current_student.employmentLocationPreference}</p>
              <p><b>Type of Work Desired: </b>{this.props.current_student.typeOfWorkDesired}</p>
              <p><b>Graduation Date: </b>{this.props.current_student.graduationDate}</p>
              <p><b>Email: </b>{this.props.current_student.email}</p>
              <p><b>Phone: </b>{this.props.current_student.phone}</p>
            </div>
        </div>
        </div>
        </div>
        )
    }
};

function mapStateToProps(state) {
  return { current_student: state.current_student }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchStudent}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminStudentView);