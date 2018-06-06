import React from "react";
import { Route } from "react-router-dom";
import HealthPlan from "health-plan/List";
import Calendar from "calendar/Calendar";
import "./Main.css";

class Main extends React.Component {
  render() {
    return (
      <main>
        <Route exact path="/" component={HealthPlan} />
        <Route exact path="/calendar" component={Calendar} />
      </main>
    );
  }
}

export default Main;
