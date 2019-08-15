import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPackage } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class PackageDetailView extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchPackage(this.props.packageId);
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
      <div className='container'>
        <div className='row mb-4'> 
          <h2>Packages > {this.props.package.packageName}</h2>
          <Link to={`/admin/editpackage/${this.props.package._id}`} className='btn btn-md btn-info float-right'>Edit</Link><Link to={`admin/packages/${this.props.package._id}/view`} className='btn btn-md btn-secondary float-right'>View As Employer</Link>
        </div>
         
        <div className='row'> 
          <div className='col-sm-7'>
            <div className='your-info border rounded px-2 mb-4'>
              <h4 className='d-inline-block'>Package Notes</h4>
              <p>{this.props.package.packageNotes}</p>
              <h5>Employer Has Viewed: {this.props.package.seenByEmployer ? 'Yes' : 'Not Yet'}</h5>
              <h6>Created On: {this.props.package.created_at}</h6>
              <h6>Last Updated: {this.props.package.updated_at}</h6>
            </div>
            <div className='employer-info border rounded px-2'>
              <h4 className='d-block'>Employer Info</h4>
              <h5>Company: {this.props.package.companyName}</h5>
              <h6>Company Contact: {this.props.package.employerName}</h6>
              <h6>Contact Email: {this.props.package.employerEmail}</h6>
            </div>
          </div>
          <div className='students col-sm-5'>
            <div className='mb-2'>
            <b className='mr-5'>Students</b>
            </div>
            <div>
            <ul className='list-group'>
              {this.props.package.students == [] ? 
                <h5>No Students Yet!</h5> : 
                
                this.props.package.students.map(studentObject => 
                  {
                    return(
                      
                      <li className='list-group-item package-student shadow-sm mb-2'>
                        <h5 className='text-center'>{studentObject.student.firstName} {studentObject.student.lastName}</h5>
                        <button type="button" className="close" aria-label="Remove Student"><span className="close package-student-delete align-middle" aria-hidden="true">&times;</span></button>
                        <label><em>Student Notes:</em></label>
                        <p className='offset-xs-1'>{studentObject.studentNotes.length === 0 || studentObject.studentNotes === ' '? <em>Add some notes here...</em> : studentObject.studentNotes}</p>
                        
                      </li>
                    )
                  }
                )
              }
            </ul>
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
  return bindActionCreators({ fetchPackage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetailView);