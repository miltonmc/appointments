import moment from 'moment';
import React, { useState } from 'react';
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';
import CustomerField from './CustomerField';
import HealthPlanField from './HealthPlanField';

export default function CalendarItem({
  id,
  errorMessage,
  healthPlanId: healthPlanIdProp,
  healthPlanHash,
  onClose,
  onSubmit,
  title,
  start,
  end,
  customer: customerProp,
  notes: notesProp,
}) {
  const [state, setState] = useState({
    startDate: moment(start ?? Date.now()).format('YYYY-MM-DD'),
    startTime: moment(start ?? Date.now()).format('HH:mm'),
    endDate: moment(end ?? Date.now()).format('YYYY-MM-DD'),
    endTime: moment(end ?? Date.now()).format('HH:mm'),
    customer: customerProp ?? '',
    healthPlanId: healthPlanIdProp ?? '',
    notes: notesProp ?? '',
  });
  const { startDate, startTime, endDate, endTime, customer, healthPlanId, notes } = state;

  function handleChange(_e, { name, value }) {
    setState({ ...state, [name]: value });
  }

  function handleSubmit() {
    const start = moment(`${startDate} ${startTime}`).toDate();
    const end = moment(`${endDate} ${endTime}`).toDate();
    const customerData = {
      id: customer.id,
      name: customer.name,
    };
    onSubmit({ id, start, end, customer: customerData, healthPlanId, notes });
  }

  return (
    <Modal size="tiny" open onClose={onClose}>
      <Modal.Header content={title} />
      <Modal.Content>
        <Form onSubmit={handleSubmit} error={!!errorMessage} size="mini">
          <Form.Group>
            <Form.Input width={7} type="date" name="startDate" value={startDate} onChange={handleChange} required />
            <Form.Input type="time" name="startTime" value={startTime} onChange={handleChange} required />
            <div className="calendar__new-item">até</div>
            <Form.Input width={7} type="date" name="endDate" value={endDate} required onChange={handleChange} />
            <Form.Input type="time" name="endTime" value={endTime} onChange={handleChange} required />
          </Form.Group>
          <CustomerField selectedCustomer={customer} onChange={handleChange} />
          <HealthPlanField
            healthPlanHash={healthPlanHash}
            selectedCustomer={customer}
            selectedHealthPlanId={healthPlanId}
            onChange={handleChange}
          />
          <Form.TextArea label="Notas" rows="3" name="notes" value={notes} onChange={handleChange} />
          <Message error header="Dados inválidos" content={errorMessage} />
          <Button color="blue">
            <Icon name="checkmark" /> Salvar
          </Button>
          <Button type="button" onClick={onClose}>
            <Icon name="close" /> Cancelar
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
