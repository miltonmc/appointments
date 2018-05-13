import React, { Component } from "react";
import { Button, Header, Segment, Table } from "semantic-ui-react";
import { FirestoreCollection } from "react-firestore";
import FirestorePath from "shared/FirestorePath";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/pt-br";
import NewItem from "./NewItem";

moment.locale("pt-BR");
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class Calendar extends Component {
  state = {};
  handleSelectNew = slotInfo => {
    this.setState({
      event: slotInfo
    });
  };

  handleSelectExisting = event => {
    this.setState({ event: event });
  };

  handleNewItem = () => {
    this.setState({
      event: null
    });
  };

  getEvents = data => {
    return data.map(event => ({
      id: event.id,
      start: event.start,
      end: event.end,
      title: event.customer.name + " - " + event.healthPlan,
      customer: event.customer,
      healthPlan: event.healthPlan
    }));
  };

  render() {
    const { event } = this.state;
    const modal = event ? (
      <NewItem onClose={() => this.handleNewItem()} {...event} />
    ) : null;

    return (
      <FirestorePath
        path="Events"
        render={fullPath => (
          <FirestoreCollection
            path={fullPath}
            render={({ isLoading, data }) => {
              const events = isLoading ? [] : this.getEvents(data);
              return (
                <Segment>
                  <Header as="h1">Agenda</Header>
                  <BigCalendar
                    defaultDate={new Date()}
                    events={events}
                    views={["month", "week", "day"]}
                    defaultView="week"
                    step={30}
                    selectable
                    showMultiDayTimes
                    onSelectSlot={slotInfo => this.handleSelectNew(slotInfo)}
                    onSelectEvent={this.handleSelectExisting}
                    messages={{
                      today: "Hoje",
                      next: "Próximo",
                      previous: "Anterior",
                      month: "Mês",
                      week: "Semana",
                      day: "Dia"
                    }}
                    style={{ height: "100vh" }}
                    />
                  {modal}
                </Segment>
              );
            }}
          />
        )}
      />
    );
  }
}
