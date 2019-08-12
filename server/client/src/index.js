import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import rootReducer from "./reducers/index";
import App from './App';
import AdminView from './components/admin/AdminView';
import EmployerView from './components/employer/EmployerView';
import StudentDetail from './components/shared/StudentDetail';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// const store = createStore(rootReducer, {}, applyMiddleware(thunk));

ReactDOM.render(
  // <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path='/admin' component={AdminView} />

          <Route exact path='/employer/:packageId' component={EmployerView} />
          <Route exact path='/employer/:packageId/student/:studentId' component={StudentDetail} />
        </Switch>
      </App>
    </BrowserRouter>,
  // </Provider>, 
document.getElementById('root'));