import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

export default class Calendar extends Component {
  render() {
    const events = [
      {
        id: 1,
        start: new Date(2018, 4, 8, 9, 0, 0),
        end: new Date(2018, 4, 8, 9, 30, 0),
        title: "Evento com nome bem grande"
      }
    ];
    console.log(events);

    return (
      <BigCalendar
        events={events}
        views={allViews}
        step={60}
        showMultiDayTimes
      />
    );
  }
}
