import React, { Component, Fragment } from "react";
// import styled from 'styled-components'

import EmployerHeader from '../nav/EmployerHeader';
import EmployerTitle from './EmployerTitle';
import EmployerCard from './EmployerCard';
import EmployerNote from './EmployerNote';

class EmployerView extends Component {

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
        <EmployerTitle />
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

export default EmployerView;
