import React from "react";
import { Route } from "react-router-dom";
import HealthPlan from "health-plan/List";
import "./Main.css";

class Main extends React.Component {
  render() {
    return (
      <main>
        <Route exact path="/" component={HealthPlan} />
      </main>
    );
  }
}

export default Main;
