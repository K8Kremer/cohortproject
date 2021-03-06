import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { emptyPackageFilter, fetchStudents, fetchPackage, fetchPackages, editPackage, updateSearch } from '../../actions';
import StudentRow from './StudentRow';
import { Dropdown, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import SearchBar from './Search';
import _ from 'lodash';

let lightRowBackground = true

class StudentList extends Component {

  state = {
    addedStudentList : [],
    redirect: false,
    filterName: ''
  }

  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchPackages();
  }

  componentDidUpdate(prevProps) {
    let prevPack = prevProps.currentPackage
    let currPack = this.props.currentPackage

    if (currPack._id == prevPack._id && currPack.students !== prevPack.students) {
      alert(`Students added to ${currPack.packageName}`)
      this.setState({ redirect: true});
    }
  }

  handleStudentClick = (student, checked) =>  {
    let checkWithinPackageStudents = _.find(this.props.currentPackage.students, (studentObject) => {
      return student._id === studentObject.student._id;
    })

    if (checked && checkWithinPackageStudents === undefined){
      let updatedStudentList = this.state.addedStudentList.concat([{ student, studentNotes: '' }]);
      this.setState({ addedStudentList: updatedStudentList})
    } else if(checked && checkWithinPackageStudents !== undefined) {
      return
    } else {
      this.setState({ addedStudentList: this.state.addedStudentList.filter(s => s.student._id !== student._id) })
    }
  }

  handlePackageSubmit = (pckg, studentArray) => {
    if (pckg.students && studentArray) {
      //concatenate our state student list with the currentPackage
      let students = this.props.currentPackage.students.concat(studentArray);
      this.props.editPackage(pckg._id, {students});
    } else {
      alert ('Please select a package and students to add')
    }
    this.setState({addedStudentList: []});
  }

  render() {

    if (this.state.redirect) {
			return (
			<Redirect to={`/admin/package/${this.props.currentPackage._id}`}/>
			)
    }
    
    //Redux Form will set certain properties to True if there are errors within your Form.
    //we have this here due to the async getPackages action, waiting for an array.
    if(this.props.packages.length === undefined) {
      return(
        <div>Hold please, loading is a bit slow...</div>
      )
    }
    
    return (
      <div className='row mx-0 pt-3 pb-3' style={{backgroundColor:'#9EAEB8', height: '100%', minHeight: '100vh'}}>
        <div className='mx-3 px-3' style={{backgroundColor:'#FFFFFF'}}>
          <div className ='d-flex justify-content-between flex-row bd-highlight mb-3 mt-3'>
            <h3 style={{color: '#3C5A6B'}}>Students</h3>
            <Button className='create-student' style={{backgroundColor: '#679AB8', borderColor: '#679AB8'}}
              onClick={e=> this.props.history.push('/admin/createstudent')}>New Student</Button>
          </div>
        
          <div className ='d-flex justify-content-between flex-row bd-highlight mb-3 mt-3'>    
            <Dropdown
            onSelect={(ekey, e)=> this.props.updateSearch(true)}>
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
                  <Dropdown.Item
                    
                    onClick={ e => 
                    {
                      e.preventDefault();
                      this.props.emptyPackageFilter({});
                    }}
                  ><strong>Clear Package Choice</strong></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
            onSelect={(ekey, e)=> this.props.updateSearch(true)}>
              <Dropdown.Toggle 
                variant="primary" 
                id="dropdown-basic" 
                style={{backgroundColor: '#679AB8', borderColor: '#679AB8'}}
                >
                 {this.state.filterName || 'Cohorts'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/**TODO: Make this smarter not harder */}
                <Dropdown.Item
                onClick={e=> this.setState({filterName: '0'})}
                >0</Dropdown.Item>
                <Dropdown.Item
                onClick={e=> this.setState({filterName: '1'})}
                >1</Dropdown.Item>
                <Dropdown.Item
                onClick={e=> this.setState({filterName: '2'})}
                >2</Dropdown.Item>
                <Dropdown.Item
                onClick={e=> this.setState({filterName: '3'})}
                >3</Dropdown.Item>
                <Dropdown.Item
                onClick={e=> this.setState({filterName: '4'})}
                >4</Dropdown.Item>
                <Dropdown.Item
                onClick={e=> this.setState({filterName: '5'})}
                >5</Dropdown.Item>
                <Dropdown.Item
                onClick={e=> this.setState({filterName: '6'})}
                >6</Dropdown.Item>
                <Dropdown.Item
                onClick={e=> this.setState({filterName: '7'})}
                >7</Dropdown.Item>
                <Dropdown.Item
                onClick={e=> this.setState({filterName: '8'})}
                >8</Dropdown.Item>
                <Dropdown.Item
                onClick={e=> this.setState({filterName: null})}
                >All</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>   
            <Button className="submit-students" style={{backgroundColor: '#679AB8', borderColor: '#679AB8'}}
              onClick={e=> this.handlePackageSubmit(this.props.currentPackage, this.state.addedStudentList)}>Add To Package</Button>
            <SearchBar searchType='students' dropdownFilter={this.state.filterName} />
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
  return bindActionCreators({ emptyPackageFilter, updateSearch, fetchStudents, fetchPackage, fetchPackages, editPackage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);