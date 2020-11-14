import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { withFirestore } from 'react-firestore';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';
import NewItem from '../calendar/NewItem';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('pt-BR');

const localizer = momentLocalizer(moment);

const getEvents = (data: Snapshot, healthPlansHash: HealthPlanHash): Appointment[] => {
  const getPlanName = (healthPlans: HealthPlanHash, id: string) => healthPlans[id]?.name ?? 'Particular';
  return data.docs.map((doc) => {
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
};

const Calendar: FunctionComponent<CalendarProps> = ({ firestore }) => {
  const [events, setEvents] = useState<Appointment[]>([]);
  const [event, setEvent] = useState<Appointment | null>(null);
  const [healthPlans, setHealthPlans] = useState<HealthPlan[]>([]);
  const handleEvent = (event: Appointment) => setEvent(event);
  const onCloseEvent = () => setEvent(null);

  useEffect(() => {
    const user = firebase.auth().currentUser as firebase.User;
    if (!user) {
      throw new Error(`[components/calendar] Current user is ${user}`);
    }
    const healthPlansPath = `/Users/${user.uid}/HealthPlans`;
    const eventPath = `/Users/${user.uid}/Events`;

    firestore.collection(healthPlansPath).onSnapshot((healthPlans) => {
      setHealthPlans((healthPlans as unknown) as HealthPlan[]);
      firestore.collection(eventPath).onSnapshot((data) => {
        const healthPlansHash: HealthPlanHash = {};
        healthPlans.forEach((doc) => (healthPlansHash[doc.id] = { id: doc.id, ...doc.data() }));
        const events = getEvents(data, healthPlansHash);
        setEvents(events);
      });
    });
  }, [firestore]);

  const modal = event && <NewItem onClose={onCloseEvent} healthPlans={healthPlans} {...event} />;

  return (
    <Segment>
      <Header as="h1" className="calendar-header">
        Agenda
        <Button
          primary
          onClick={() =>
            handleEvent({
              start: moment().toDate(),
              end: moment().add(30, 'minutes').toDate(),
            })
          }
        >
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
        onSelectSlot={handleEvent}
        onSelectEvent={handleEvent}
        messages={{
          today: 'Hoje',
          next: 'Próximo',
          previous: 'Anterior',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          agenda: 'Agenda',
        }}
        style={{ height: '100vh' }}
      />
      {modal}
    </Segment>
  );
};

export default withFirestore(Calendar);

interface CalendarProps {
  firestore: firebase.firestore.Firestore;
}

type Snapshot = firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>;
