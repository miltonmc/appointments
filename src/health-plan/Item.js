import React, { Component } from 'react';
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';
import { format } from 'cnpj';

export default class Item extends Component {
  state = { cnpj: this.props.cnpj || '', name: this.props.name || '' };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { name, cnpj } = this.state;
    const { id, onSubmit } = this.props;
    onSubmit(id, cnpj, name);
  };

  render() {
    const { name, cnpj } = this.state;
    const { errorMessage, isNew, onClose, title } = this.props;
    const isNotNew = !isNew;
    return (
      <Modal size="mini" open onClose={onClose}>
        <Modal.Header content={title} />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} error={!!errorMessage}>
            <Form.Input
              required={isNew}
              label={`CNPJ${isNew ? ' (apenas números)' : ''}`}
              name="cnpj"
              value={isNew ? cnpj : format(cnpj)}
              autoFocus={isNew}
              disabled={isNotNew}
              pattern="\d*"
              maxLength={14}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              label="Nome"
              name="name"
              value={name}
              autoFocus={isNotNew}
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
