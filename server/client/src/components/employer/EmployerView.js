import React, { Component, Fragment } from "react";
// import styled from 'styled-components'
import { connect } from 'react-redux';
import { fetchPackage } from '../../actions';
import { bindActionCreators } from 'redux';
//import { Link } from 'react-router-dom';

import EmployerHeader from '../nav/EmployerHeader';
import EmployerTitle from './EmployerTitle';
import EmployerCard from './EmployerCard';
import EmployerNote from './EmployerNote';

class EmployerView extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchPackage(this.props.packageId);
  }

  renderList() {
    const test = [0, 1, 2, 3, 4, 5];
    return test.map((i) => {
      return (
        <EmployerCard key={i} cardId={i} />
      )
    })
  }

  render() {
    return (
      <Fragment>
        <EmployerHeader />
        <EmployerTitle employerName={this.props.package.employerName} companyName={this.props.package.companyName} replyName={this.props.package.replyName}/>
        <EmployerNote />
        <div className="container-fluid">
          <div className="row" style={{ margin: 0 }}>
            {this.renderList()}
          </div>
        </div>
      </Fragment>
    )
  }
};

//export default EmployerView;

function mapStateToProps(state, ownProps) {
  
  return {
    packageId: ownProps.match.params.packageId,
    package: state.current_package
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPackage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerView);