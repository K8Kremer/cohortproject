import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PackageDetailView extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='container'>
        <div className='row'> 
          <h2>Packages > {this.props.package.packageName}</h2><Link to={`/admin/packages/${this.props.package._id}/edit`} className='btn btn-lg btn-info float-right'>Edit</Link><Link to={`admin/packages/${this.props.package._id}/view`} className='btn btn-lg btn-secondary float-right'>View As Employer</Link>
        </div>
        <div className='row'> 
          <div className='col-sm-7'>
            <div className='your-info border rounded'>
              <h4 className='float-left'>Your Info</h4>
              <p>{this.props.package.packageNotes}</p>
              <h5>Employer Has Viewed: {this.props.package.seenByEmployer ? 'Yes' : 'Not Yet'}</h5>
              <h6>Created On: {this.props.package.created_at}</h6>
              <h6>Last Updated: {this.props.package.updated_at}</h6>
            </div>
            <div className='employer-info border rounded'>
              <h4 className='float-left'>Employer Info</h4>
              <h5>Company: {this.props.package.companyName}</h5>
              <h6>Company Contact: {this.props.package.employerName}</h6>
              <h6>Contact Email: {this.props.package.employerEmail}</h6>
            </div>
          </div>
          <div className='students col-sm-5'>
            <h4 className='float-left'>Students</h4>
            <ul>
              {this.props.package.students.length === 0 ? 
                <h5>No Students Yet!</h5> : 
                this.props.package.students.map(student => <li>{student.firstName}</li>)
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps({ packages }, ownProps) {
  const currentPackage = packages.find(item => item._id == ownProps.match.params.packageId);
  return {
    package: currentPackage
  };
}

export default connect(mapStateToProps, null)(PackageDetailView);