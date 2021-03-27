import React from 'react';
import { Route } from 'react-router-dom';
import Calendar from '../components/Calendar';
import { CALENDAR, CUSTOMER, EVENT, HEALTH_PLAN } from '../constants/Routes';
import Customer from '../customer/List';
import Event from '../event/List';
import HealthPlan from '../health-plan/List';

const Main = () => {
  return (
    <main>
      <Route exact path={CALENDAR} component={Calendar} />
      <Route exact path={EVENT} component={Event} />
      <Route exact path={CUSTOMER} component={Customer} />
      <Route exact path={HEALTH_PLAN} component={HealthPlan} />
    </main>
  );
};

export default Main;
