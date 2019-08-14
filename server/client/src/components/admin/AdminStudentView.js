import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudent, fetchPackages } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';


  class AdminStudentView extends Component {
    //loads with student Id provided from URL
    componentDidMount(){
      this.props.fetchStudent(this.props.match.params.studentId);
      this.props.fetchPackages();
    }
  

    //blank for now, should eventually add functionality to attach student to a package on this page as well.  
    addStudentToPackage = () => {
      console.log('added student to package');
    }
  
    render(){
    
      return (
       
        <div style={{backgroundColor:"#9EAEB8"}}>
        
        <div className='container'>
          <div className='row'>
            
              
          <div className='col-12 card shadow-sm p-3 mb-5 bg-white rounded'>
            
              <div className='card-header text-center'>
                {/* no functionality yet in buttons or dropdown and there is a prettier bootstrap dropdown version if anyone wants to play with that*/}
                <Link to = {`/admin/editstudent/${this.props.current_student._id}`}><button type='button' className='btn btn-sm' style={{backgroundColor: "#9EAEB8", position:'absolute', right: 150}}>Edit</button></Link>
                <Link to = '/employer/:packageId/student/:studentId'><button type='button' className='btn btn-sm' style={{backgroundColor: "#9EAEB8", position:'absolute', right: 20}}>View as Employer</button></Link>
                <select style={{position:'absolute', top: 100,right: 20}}name='package' onChange={this.addStudentToPackage}>
                  <option />
                  {/* will need to render available packages into dropdown options here for now hard coding two options*/}
                  {this.props.packages.map((p) => {
                  return (
                    <option>{p.packageName}</option>
                  )
                })}
                </select>
                
 
              <img className='img-thumbnail rounded float-left' style={{height: 100, width: 100}}src={this.props.current_student.picture}></img>
              <h2 style={{textAlign:'center', marginTop: 30, marginRight: 100}}>{this.props.current_student.firstName} {this.props.current_student.lastName}</h2>
              </div>
              <div className='card-body text-center'>
              
              <p><em> {this.props.current_student.bio}</em></p>
              </div>
              <p><b>Job Seeking Status:</b> {this.props.current_student.jobSeekingStatus}</p>
              <p><b>Project Repos:</b></p>
              
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
  return { 
    current_student: state.current_student,
    packages: state.packages
   }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchStudent, fetchPackages}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminStudentView);