import React, { Component, Fragment } from "react";
// import styled from 'styled-components'
import { connect } from 'react-redux';
import { fetchPackage, editPackage } from '../../actions';
import { bindActionCreators } from 'redux';
//import { Link } from 'react-router-dom';

import EmployerHeader from '../nav/EmployerHeader';
import EmployerTitle from './EmployerTitle';
import EmployerCard from './EmployerCard';
import EmployerNote from './EmployerNote';

class EmployerView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.isAdmin);
    this.props.fetchPackage(this.props.packageId);
    console.log(this.props.isAdmin);
    console.log(this.ownProps);
    let isAdmin = this.props.isAdmin.split('=')
    if (isAdmin[1] !== 'true'){
      this.props.editPackage(this.props.packageId, {seenByEmployer: true})
    }
  }

  renderList() {
    if (this.props.package.students.length === 0) {
      return (
        <div></div>
      )
    } else {
      return this.props.package.students.map(studentObject => {
        return (
          <EmployerCard key={studentObject._id} packageId={this.props.packageId} studentNotes={studentObject.studentNotes} student={studentObject.student} />
        )
      })
    }
  }

  render() {
    if (Object.keys(this.props.package).length === 0) {
      return (
        <Fragment>
          <EmployerHeader />
          <EmployerTitle />
          <EmployerNote packageNotes='' />
        </Fragment>
      )
    }
    return (
      <Fragment>
        <EmployerHeader />
        <EmployerTitle employerName={this.props.package.employerName} companyName={this.props.package.companyName} replyName={this.props.package.replyName} />
        <EmployerNote packageNotes={this.props.package.packageNotes} />
        <div className="container-fluid">
          <div className="row" style={{ margin: 0 }}>
            {this.renderList()}
          </div>
        </div>
      </Fragment>
    )
  }
};

function mapStateToProps(state, ownProps) {
  return {
    packageId: ownProps.match.params.packageId,
    package: state.current_package,
    isAdmin: ownProps.location.search
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPackage, editPackage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerView);