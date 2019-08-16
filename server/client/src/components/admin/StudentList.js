import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStudents, fetchPackage, fetchPackages, editPackage } from '../../actions';
import StudentRow from './StudentRow';
import { Dropdown, Button } from 'react-bootstrap'
import { Redirect } from 'react-router'
import SearchBar from './Search'

let lightRowBackground = true

class StudentList extends Component {

  state = {
    addedStudentList : [],
    redirect: false
  }

  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchPackages();
  }

  async componentDidUpdate(prevProps) {
    let currPack = await this.props.currentPackage
    let prevPack = await prevProps.currentPackage
    if (currPack._id == prevPack._id && currPack.students !== prevPack.students) {
      alert(`Students added to ${currPack.packageName}`)
      this.setState({addedStudentList: [], redirect: true});
    }
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
    this.setState({addedStudentList: []});
  }

  render() {

    if (this.state.redirect) {
			return (
			<Redirect to={`/admin/package/${this.props.currentPackage._id}`}/>
			)
		}
    
    return (
      <div className='row mx-0 pt-3 pb-3' style={{backgroundColor:'#9EAEB8', height: '100%', minHeight: '100vh'}}>
        <div className='mx-3 px-3' style={{backgroundColor:'#FFFFFF'}}>
          <div className ='d-flex justify-content-between flex-row bd-highlight mb-3 mt-3'>
            <h3>Students</h3>
            <Button className='create-student' style={{backgroundColor: '#679AB8', borderColor: '#679AB8'}}
              onClick={e=> this.props.history.push('/admin/createstudent')}>New Student</Button>
          </div>
        
          <div className ='d-flex justify-content-between flex-row bd-highlight mb-3 mt-3'>    
            <Dropdown>
              <span>Choose a package: </span>
              <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{backgroundColor: '#679AB8', borderColor: '#679AB8'}}>
                {this.props.currentPackage.packageName ? this.props.currentPackage.packageName : 'Packages'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.props.packages.map((pckg) => {
                  return <Dropdown.Item 
                    key={pckg.id} 
                    href='#' 
                    onClick={ e => 
                      {
                        e.preventDefault();
                        this.props.fetchPackage(pckg._id)}}
                      >
                      {pckg.packageName}
                  </Dropdown.Item>
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Button className="submit-students" style={{backgroundColor: '#679AB8', borderColor: '#679AB8'}}
              onClick={e=> this.handlePackageSubmit(this.props.currentPackage, this.state.addedStudentList)}>Submit Students To Package</Button>
            <SearchBar searchType='students' dropdownFilter='filter' />
          </div>

          <table className='shadow p-3 mb-5 bg-white rounded'style={{tableLayout: 'fixed'}}className='table table-hover'>
            <tr style={{backgroundColor:'#3C5B6F', color: '#ffffff'}}>
              <th style={{textAlign: 'center', width:'10px'}}></th>
              <th style={{width:'calc(20%-2px)'}}>First Name</th>
              <th style={{width:'calc(20%-2px)'}}>Last Name</th>
              <th style={{width:'calc(10%-1px)'}}>Cohort</th>
              <th style={{width:'calc(20%-2px)'}}>Job-Seeking Status</th>
              <th style={{textAlign: 'center', width:'calc(10%-1px)'}}></th>
            </tr>
            <tbody style={{backgroundColor: 'white'}}>
            {this.props.students.map((student) => {
                let backgroundColor;
                if (lightRowBackground) {
                  lightRowBackground= false
                  backgroundColor = 'white'
                } else {
                  lightRowBackground = true
                  backgroundColor = '#c5d0d6'
                }
                  return (
                    <StudentRow key={student._id} backgroundColor={backgroundColor} student={student} handleStudentClick={this.handleStudentClick} addedStudentList={this.state.addedStudentList}/>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
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