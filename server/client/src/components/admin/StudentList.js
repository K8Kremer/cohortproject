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
      <div>studentlist</div>
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