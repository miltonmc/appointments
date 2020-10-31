import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Main from './layout/Main';

const LoggedApp = () => (
  <Router>
    <div>
      <Header />
      <Main />
    </div>
  </Router>
);

export default LoggedApp;
