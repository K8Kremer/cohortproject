import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStudent } from '../../actions';
import { bindActionCreators } from 'redux';


  class AdminStudentView extends Component {

  
    //hardcoded student id for testing purposes
    handleClick = (event) => {
      this.props.fetchStudent("5d52d7ca9c840b774c6b7e5f");
    }
  
    render(){
      return (
        //placeholder button until list gets populated and we can move onClick to student row
        <button btn btn-primary onClick={this.handleClick}>Placeholder for GET Student</button>
      )
    }
};


function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchStudent}, dispatch);
}
export default connect(null, mapDispatchToProps)(AdminStudentView);