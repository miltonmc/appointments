import firebase from 'firebase/app';
import moment from 'moment';
import 'moment/locale/pt-br';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withFirestore } from 'react-firestore';
import { Button, Header, Segment } from 'semantic-ui-react';
import NewItem from '../calendar/NewItem';
import FirebaseContext from '../context/FirebaseContext';
import { generateHash } from '../utils/health-plan-utils';

moment.locale('pt-BR');

const localizer = momentLocalizer(moment);

const Calendar: FunctionComponent<CalendarProps> = ({ firestore }) => {
  const { firestorePath } = useContext(FirebaseContext);
  const [events, setEvents] = useState<Appointment[]>([]);
  const [event, setEvent] = useState<Appointment | null>(null);
  const [healthPlanHash, setHealthPlanHash] = useState<HealthPlanHash>({});

  const handleEvent = (event: Appointment) => setEvent(event);
  const onCloseEvent = () => setEvent(null);

  useEffect(() => {
    return firestore.collection(`${firestorePath}/HealthPlans`).onSnapshot((snapshot) => {
      const hash = generateHash(snapshot);
      setHealthPlanHash(hash);
    });
  }, [firestore, firestorePath]);

  useEffect(() => {
    return firestore.collection(`${firestorePath}/Events`).onSnapshot((data) => {
      const getPlanName = (id: string) => healthPlanHash[id] ?? 'Particular';
      const events = data.docs.map((doc) => {
        const event = doc.data();
        return {
          id: doc.id,
          title: `[${getPlanName(event.healthPlanId)}] ${event.customer.name}`,
          start: event.start.toDate(),
          end: event.end.toDate(),
          customer: event.customer,
          healthPlanId: event.healthPlanId,
          notes: event.notes,
        };
      });
      setEvents(events);
    });
  }, [firestore, firestorePath, healthPlanHash]);

  const modal = event && <NewItem onClose={onCloseEvent} healthPlanHash={healthPlanHash} {...event} />;

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
