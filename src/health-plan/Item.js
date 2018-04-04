import React, { Component } from "react";
import { Button, Form, Icon, Message, Modal } from "semantic-ui-react";

export default class Item extends Component {
  state = { cnpj: this.props.cnpj || "", name: this.props.name || "" };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { name, cnpj } = this.state;
    const { id, onSubmit } = this.props;
    onSubmit(id, cnpj, name);
  };

  render() {
    const { name, cnpj } = this.state;
    const { errorMessage, onClose } = this.props;
    return (
      <Modal size="mini" open={true} onClose={onClose}>
        <Modal.Header content="Novo Convênio" />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} error={!!errorMessage}>
            <Form.Input
              required
              label="CNPJ (apenas números)"
              name="cnpj"
              value={cnpj}
              autoFocus
              pattern="\d*"
              maxLength={14}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              label="Nome"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            <Message error header="Dados inválidos" content={errorMessage} />
            <Button color="green">
              <Icon name="checkmark" /> Cadastrar
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
