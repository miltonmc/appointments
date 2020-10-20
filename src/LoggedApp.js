import Main from 'layout/Main';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';

export default () => (
  <Router>
    <div>
      <Header />
      <Main />
    </div>
  </Router>
);
