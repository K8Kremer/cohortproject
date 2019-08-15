import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageHeader from '../nav/navpane';
import SideBar from '../nav/sidebar';
import LoginPage from './LoginPage';
import StudentList from './StudentList';
import AdminStudentView from './AdminStudentView'
import CreateStudent from './CreateStudent';
import EditStudent from './EditStudent';
import PackageList from './PackageList';
import CreatePackage from './CreatePackage';
import EditPackage from './EditPackage';
import PackageDetailView from './PackageDetailView';



const AdminView = () => {
  return (
    <Fragment>
      <PageHeader />
      <SideBar />
      <Switch>
        <Route exact path='/admin/login'                  component={LoginPage} />
        <Route exact path='/admin/studentlist'            component={StudentList} />
        <Route exact path='/admin/student/:studentId'     component={AdminStudentView} />
        <Route exact path='/admin/createstudent'          component={CreateStudent} />
        <Route exact path='/admin/editstudent/:studentId' component={EditStudent} />
        <Route exact path='/admin/packagelist'            component={PackageList} />
        <Route exact path='/admin/package/:packageId'     component={PackageDetailView} />
        <Route exact path='/admin/createpackage'          component={CreatePackage} />
        <Route exact path='/admin/editpackage/:packageId' component={EditPackage} />
        <Redirect to='/admin/studentlist' />
      </Switch>
    </Fragment>
  )
};

export default AdminView;