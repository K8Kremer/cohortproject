import React, { Fragment } from "react";
import EmployerHeader from '../nav/EmployerHeader';
import EmployerTitle from '../employer/EmployerTitle';

const EmployerStudentView = () => {
  return (
    <Fragment>
      <EmployerHeader />
      <EmployerTitle />
      <div className="container-fluid">
        Back to Students [link]
      </div>
      <div className="container-fluid">
        Student Details [row with cards in columns]
      </div>
    </Fragment>
  )
};

export default EmployerStudentView;