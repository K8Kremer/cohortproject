import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStudents, fetchPackage, fetchPackages, editPackage } from '../../actions';
import StudentRow from './StudentRow';
import { Dropdown, Button } from 'react-bootstrap'

class StudentList extends Component {

  state = {
    addedStudentList : []
  }

  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchPackages();
  }

  handleStudentClick = (student, checked) =>  {
    if (checked) {
      this.setState({addedStudentList: this.state.addedStudentList.concat([{student, studentNotes: ''}])})
    } else {
      this.setState({addedStudentList: this.state.addedStudentList.filter(s=> s.student._id !== student._id)})
    }
  }

  handlePackageSubmit = (pckg, students) => {
    if (pckg && students) {
      this.props.editPackage(pckg._id, {students});
    }
  }

  render() {
    return (
      <>
      <div className='row'>
      <div className='col-2'style={{backgroundColor:'#9EAEB8'}}>

      </div>

      <div className='col-8'>
      <div className ='d-flex justify-content-between flex-row bd-highlight mb-3 mt-3'>
        <h3>Students</h3>
        <Button className='create-student'
          onClick={e=> this.props.history.push('/admin/createstudent')}>Create Student</Button>
      </div>
      
      <div className ='d-flex justify-content-between flex-row bd-highlight mb-3 mt-3'>   
        
        <Dropdown>
        <span>Choose a package: </span>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {this.props.currentPackage.packageName ? this.props.currentPackage.packageName : 'Packages'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {this.props.packages.map((pckg) => {
            return <Dropdown.Item 
              key={pckg.id} 
              href='#' 
              onClick={ e => 
                {this.props.fetchPackage(pckg._id)}}
                >
                {pckg.packageName}
            </Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Button className="submit-students"
              onClick={e=> this.handlePackageSubmit(this.props.currentPackage, this.state.addedStudentList)}>Submit Students To Package</Button>
    </div>
      <table className='shadow p-3 mb-5 bg-white rounded'style={{tableLayout: 'fixed'}}className='table table-hover'>
        <tr style={{backgroundColor:'#679AB8'}}>
          <th style={{textAlign: 'center', width:'10%'}}></th>
          <th style={{width:'20%'}}>First Name</th>
          <th style={{width:'20%'}}>Last Name</th>
          <th style={{width:'10%'}}>Cohort</th>
          <th style={{width:'20%'}}>Job-Seeking Status</th>
          <th style={{textAlign: 'center', width:'10%'}}></th>
          <th style={{textAlign: 'center', width:'10%'}}></th>
  
        </tr>
        <tbody style={{backgroundColor: 'white'}}>
        {this.props.students.map((student) => {
          return (
            <StudentRow key={student._id} student={student} handleStudentClick={this.handleStudentClick}/>
          )
        })}
        </tbody>
      </table>
      </div>
      <div className='col-2'style={{backgroundColor:'#9EAEB8'}}> </div>
      
      </div>
      </>
    )
  }
};

function mapStateToProps(state) {
  return {
    students: state.students,
    packages: state.packages,
    currentPackage: state.current_package
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStudents, fetchPackage, fetchPackages, editPackage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);