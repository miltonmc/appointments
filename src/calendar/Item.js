import React, { Component } from "react";
import { Button, Form, Icon, Message, Modal } from "semantic-ui-react";

export default class Item extends Component {
  state = {};

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { name, cnpj } = this.state;
    const { id, onSubmit } = this.props;
    onSubmit(id, cnpj, name);
  };

  render() {
    const { name, cnpj } = this.state;
    const { errorMessage, isNew, onClose, title, start, end } = this.props;
    const isNotNew = !isNew;

    const slot = `${start.toLocaleString()} até ${end.toLocaleString()}`;

    const customers = [{
      key: 'Francisco',
      value: 'Francisco',
      text: 'Francisco'
    }, {
      key: 'Milton',
      value: 'Milton',
      text: 'Milton'
    }];

    return (
      <Modal size="mini" open onClose={onClose}>
        <Modal.Header content={title} />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} error={!!errorMessage}>
            <Form.Input label="Período" name="date" value={slot} disabled />
            <Form.Dropdown label="Cliente" placeholder='Selecionar Cliente' fluid search selection options={customers} />

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
