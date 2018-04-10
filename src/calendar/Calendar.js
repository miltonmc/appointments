import React, { Component } from "react";
import { Button, Header, Segment, Table } from "semantic-ui-react";
import { FirestoreCollection } from "react-firestore";
import FirestorePath from "shared/FirestorePath";
import BigCalendar from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-BR");
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class Calendar extends Component {
  render() {
    return (
      <Segment>
        <Header as="h1">Agenda</Header>
        <BigCalendar
          events={[]}
          defaultView="week"
          views={['month', 'week']}
          selectable
          onSelectSlot={slotInfo =>
            alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                `\nend: ${slotInfo.end.toLocaleString()}` +
                `\naction: ${slotInfo.action}`
            )
          }
          messages={{
            today: "Hoje",
            next: "Próximo",
            previous: "Anterior",
            month: "Mês",
            week: "Semana"
          }}
        />
      </Segment>
    );
  }
}
