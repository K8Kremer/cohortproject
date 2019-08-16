import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPackage, editPackage } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class PackageDetailView extends Component {
  constructor(props){
    super(props);
    this.removeStudent = this.removeStudent.bind(this);
  }

  componentDidMount() {
    this.props.fetchPackage(this.props.packageId);
  }

  removeStudent(studentId){
    let newStudentArray = this.props.package.students.filter(studentObject => studentObject.student._id !== studentId);
    this.props.editPackage(this.props.packageId, { students: newStudentArray });
  }
  
  formatDate = (date) => {
    let newDate = new Date(date);
     return newDate.toLocaleDateString();
  }

  render(){
    
    if(Object.keys(this.props.package).length === 0){
      
      return(
        <div className='container'>
          <div className='row'>
            <div className='col-sm-7'>
              No package here just yet! Hold please...
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className='row mx-0 pt-3 pb-3' style={{backgroundColor:'#9EAEB8', height: '100%', minHeight: '100vh'}}>
        <div className='mx-3 px-3' style={{backgroundColor:'#FFFFFF'}}>
        <div className='row mb-2 p-3'> 
          <h3 style={{color: '#3C5A6B'}}>Packages > {this.props.package.packageName}</h3>
          <Link to={`/admin/editpackage/${this.props.package._id}`}className='btn btn-md btn-info float-right mx-3 mb-3' style={{backgroundColor: '#679AB8'}}>Edit</Link>
          <Link to={`/employer/${this.props.package._id}`} className='btn btn-md btn-secondary float-right mb-3' style={{backgroundColor: '#679AB8'}}>View As Employer</Link>
        </div>
         
        <div className='row'> 
          <div className='col-sm-7 pt-4'>
            <div className='your-info border rounded mb-4'>
              <h4 className='d-inline-block' style={{color: '#3C5A6B'}}>Package Notes</h4>
              <p>{this.props.package.packageNotes}</p>
              <div className="p-2 rounded" style={{backgroundColor: '#3C5A6B', color: 'white'}}>
                <h5>Employer Has Viewed: {this.props.package.seenByEmployer ? 'Yes' : 'Not Yet'}</h5>
                <h6>Created On: {this.formatDate(this.props.package.created_at)}</h6>
                <h6>Last Updated: {this.formatDate(this.props.package.updated_at)}</h6>
              </div>
            </div>
            <div className='employer-info border rounded px-2'>
              <h4 className='d-block'>Employer Info</h4>
              <div className="mt-3">
              <h5>Company: {this.props.package.companyName}</h5>
              <h6>Company Contact: {this.props.package.employerName}</h6>
              <h6>Contact Email: {this.props.package.employerEmail}</h6>
              </div>
            </div>
          </div>
          <div className='students col-sm-5'>
            <div className='mb-2'>
            <b className='mr-5' style={{color: '#3C5A6B'}}>Students</b>
            </div>
            <div>
            <ul className='list-group'>
              {this.props.package.students == [] ? 
                <h5>No Students Yet!</h5> : 
                
                this.props.package.students.map(studentObject => 
                  {
                    return(
                      
                      <div className='package-student shadow-sm mb-4'>
                        <div className="rounded pt-3 pb-2 mb-3" style={{backgroundColor: '#3C5A6B', color: 'white'}}>
                        <h5 className='text-center'>{studentObject.student.firstName} {studentObject.student.lastName}</h5>
                        </div>
                        <button
                          type="button" onClick={e => {
                            e.preventDefault();
                            this.removeStudent(studentObject.student._id);
                          }}
                          className="close" 
                          aria-label="Remove Student">
                            <span className="close package-student-delete align-middle" aria-hidden="true">&times;</span></button>
                        <label><em>Student Notes:</em></label>
                        <p className='offset-xs-1'>{studentObject.studentNotes.length === 0 || studentObject.studentNotes === ' '? <em>Add some notes here...</em> : studentObject.studentNotes}</p>
                        
                      </div>
                    )
                  }
                )
              }
            </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state, ownProps) {
  
  return {
    packageId: ownProps.match.params.packageId,
    package: state.current_package
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPackage, editPackage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetailView);