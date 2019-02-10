import React, {Component} from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { withFirestore } from 'react-firestore';
import BigCalendar from 'react-big-calendar';
import Firebase from 'firebase';
import moment from 'moment';
import NewItem from './NewItem';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

moment.locale('pt-BR');

const localizer = BigCalendar.momentLocalizer(moment) 

class Calendar extends Component {
  state = { events: [] };

  handleEvent = event => this.setState({ event });

  onCloseEvent = () => this.setState({ event: null });

  getEvents(data, healthPlansHash) {
    const getPlanName = (healthPlans, id) => (id && healthPlans[id] && healthPlans[id].name) || 'Particular';
    return data.docs.map(doc => {
      const event = doc.data();
      const title = `[${getPlanName(healthPlansHash, event.healthPlanId)}] ${event.customer.name}`;
      return {
        id: doc.id,
        title,
        start: event.start.toDate(),
        end: event.end.toDate(),
        customer: event.customer,
        healthPlanId: event.healthPlanId,
        notes: event.notes,
      };
    });
  }

  componentDidMount() {
    const { firestore } = this.props;
    const user = Firebase.auth().currentUser;
    const healthPlansPath = `/Users/${user.uid}/HealthPlans`;
    const eventPath = `/Users/${user.uid}/Events`;

    firestore.collection(healthPlansPath).onSnapshot(
      healthPlans => firestore.collection(eventPath).onSnapshot(data => {
        const healthPlansHash = {};
        healthPlans.forEach(doc => healthPlansHash[doc.id] = {id: doc.id, ...doc.data()});
        const events = this.getEvents(data, healthPlansHash)
        this.setState({events, healthPlans});
      })
    );
  }

  render() {
    const { event, events, healthPlans } = this.state;
    const modal = event && <NewItem onClose={this.onCloseEvent} healthPlans={healthPlans} {...event} />;

    return (
      <Segment>
        <Header as="h1" className="calendar-header">
          Agenda
          <Button primary onClick={() => this.handleEvent({ start: moment().toDate(), end: moment().add(30,'minutes').toDate() })}>
            Nova Consulta
          </Button>
        </Header>
        <BigCalendar
          localizer={localizer}
          formats={{ eventTimeRangeFormat: () => null }}
          defaultDate={new Date()}
          events={events}
          views={['day', 'week', 'month']}
          defaultView="day"
          step={30}
          selectable
          showMultiDayTimes
          onSelectSlot={this.handleEvent}
          onSelectEvent={this.handleEvent}
          messages={{
            today: "Hoje",
            next: "Próximo",
            previous: "Anterior",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda"
          }}
          style={{ height: "100vh" }}
          />
        {modal}
      </Segment>
    );
  }
}

export default withFirestore(Calendar);
