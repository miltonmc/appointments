import React from 'react';
import Header from 'layout/Header';
import Main from 'layout/Main';
import { BrowserRouter as Router } from 'react-router-dom';

export default () => (
  <Router>
    <div>
      <Header />
      <Main />
    </div>
  </Router>
);
