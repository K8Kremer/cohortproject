import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStudents } from '../../actions';

class StudentList extends Component {
  componentDidMount() {
    this.props.fetchStudents();
  }

  render() {
    return (
      <>
        {this.props.students.map((student) => {
          return (
            <div key={student._id}>{student.firstName} cohort {student.cohort}</div>
          )
        })}
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