import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import rootReducer from "./reducers/index";
import App from './App';
import AdminView from './components/admin/AdminView';
import EmployerView from './components/employer/EmployerView';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import EmployerStudentView from './components/shared/EmployerStudentView';

// const store = createStore(rootReducer, {}, applyMiddleware(thunk));

ReactDOM.render(
  // <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path='/admin/employerstudentview/:studentId' component={EmployerStudentView} />
          <Route path='/admin' component={AdminView} />

          <Route exact path='/employer/:packageId' component={EmployerView} />
          <Route exact path='/employer/:packageId/student/:studentId' component={EmployerStudentView} />
        </Switch>
      </App>
    </BrowserRouter>,
  // </Provider>, 
document.getElementById('root'));