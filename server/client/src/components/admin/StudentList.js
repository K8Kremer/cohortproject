import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStudents } from '../../actions';
import StudentRow from './StudentRow';

class StudentList extends Component {
  componentDidMount() {
    this.props.fetchStudents();
  }

  render() {
    return (
      <>
      <div className='row'>
      <div className='col-2'style={{backgroundColor:'#9EAEB8'}}>

      </div>

      <div className='col-8'>
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
            <StudentRow key={student._id} student={student}/>
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
    students: state.students
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStudents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);