import React from 'react';
import { withRouter } from "react-router-dom";
//for not not connecting anything to redux
// import * as actions from '../actions';
import { connect } from "react-redux";
import styled from "styled-components";

const App = ({ children }) => {
  return (
    <AppContainer>
      {children}
    </AppContainer>
  );
}

export default App;
// export default withRouter(connect(
//   null,
//   null // actions
// )(App));

const AppContainer = styled.div`
  padding-top: 100px;
`;