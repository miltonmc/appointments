import React from "react";
import { Route } from "react-router-dom";
import HealthPlan from "health-plan/List";
import Calendar from "calendar/Calendar";
import { CALENDAR, CUSTOMER, EVENT, HEALTH_PLAN } from "../shared/Routes";
import "./Main.css";
import Customer from "../customer/List";
import Event from "../event/List";

class Main extends React.Component {
  render() {
    return (
      <main>
        <Route exact path={CALENDAR} component={Calendar} />
        <Route exact path={EVENT} component={Event} />
        <Route exact path={CUSTOMER} component={Customer} />
        <Route exact path={HEALTH_PLAN} component={HealthPlan} />
      </main>
    );
  }
}

export default Main;