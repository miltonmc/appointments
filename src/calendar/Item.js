import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';
import CustomerField from './CustomerField';
import moment from 'moment';
import React, { Component } from 'react';
import HealthPlanField from './HealthPlanField';
import './Item.css';

export default class Item extends Component {
  state = {
    startDate: moment(this.props.start || Date.now()).format('YYYY-MM-DD'),
    startTime: moment(this.props.start || Date.now()).format('HH:mm'),
    endDate: moment(this.props.end || Date.now()).format('YYYY-MM-DD'),
    endTime: moment(this.props.end || Date.now()).format('HH:mm'),
    customer: this.props.customer || '',
    healthPlanId: this.props.healthPlanId || '',
    notes: this.props.notes || '',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const {
      startDate,
      startTime,
      endDate,
      endTime,
      customer,
      notes,
      healthPlanId
    } = this.state;
    const { id, onSubmit } = this.props;
    const start = moment(`${startDate} ${startTime}`).toDate();
    const end = moment(`${endDate} ${endTime}`).toDate();
    const customerData = {
      id: customer.id,
      name: customer.name
    };
    onSubmit({ id, start, end, customer: customerData, healthPlanId, notes });
  };

  render() {
    const {
      startDate,
      startTime,
      endDate,
      endTime,
      customer,
      notes,
      healthPlanId
    } = this.state;
    const { errorMessage, healthPlans, onClose, title } = this.props;
    return (
      <Modal size="tiny" open onClose={onClose}>
        <Modal.Header content={title} />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} error={!!errorMessage} size="mini">
            <Form.Group>
              <Form.Input
                width={7}
                type="date"
                name="startDate"
                value={startDate}
                onChange={this.handleChange}
                required
              />
              <Form.Input
                type="time"
                name="startTime"
                value={startTime}
                onChange={this.handleChange}
                required
              />
              <div className="calendar__new-item">até</div>
              <Form.Input
                width={7}
                type="date"
                name="endDate"
                value={endDate}
                required
                onChange={this.handleChange}
              />
              <Form.Input
                type="time"
                name="endTime"
                value={endTime}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <CustomerField
              selectedCustomer={customer}
              onChange={this.handleChange}
            />
            <HealthPlanField
              healthPlans={healthPlans}
              selectedCustomer={customer}
              selectedHealthPlanId={healthPlanId}
              onChange={this.handleChange}
            />
            <Form.TextArea
                label="Notas"
                rows="3"
                name="notes"
                value={notes}
                onChange={this.handleChange}
            />
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
}
