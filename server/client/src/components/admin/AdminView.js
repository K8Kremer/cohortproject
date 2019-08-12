import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageHeader from '../nav/navpane';
import LoginPage from './LoginPage';
import StudentList from './StudentList';
import CreateStudent from './CreateStudent';
import EditStudent from './EditStudent';
import PackageList from './PackageList';
import CreatePackage from './CreatePackage';
import EditPackage from './EditPackage';

const AdminView = () => {
  return (
    <Fragment>
      <PageHeader />
      <Switch>
        <Route exact path='/admin/login'         component={LoginPage} />
        <Route exact path='/admin/studentlist'   component={StudentList} />
        <Route exact path='/admin/createstudent' component={CreateStudent} />
        <Route exact path='/admin/editstudent'   component={EditStudent} />
        <Route exact path='/admin/packagelist'   component={PackageList} />
        <Route exact path='/admin/createpackage' component={CreatePackage} />
        <Route exact path='/admin/editpackage'   component={EditPackage} />
      </Switch>
    </Fragment>
  )
};

export default AdminView;