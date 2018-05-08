import React, { Component } from "react";
import { Button, Form, Icon, Message, Modal } from "semantic-ui-react";
import CPF from "cpf";
import HealthPlanSelector from "shared/HealthPlanSelector";

export default class Item extends Component {
  state = {
    address: this.props.address || "",
    address2: this.props.address2 || "",
    neighborhood: this.props.neighborhood || "",
    birth: this.props.birth || "",
    rg: this.props.rg || "",
    cpf: this.props.cpf || "",
    email: this.props.email || "",
    gender: this.props.gender || "",
    healthPlanId: this.props.healthPlanId || "",
    name: this.props.name || "",
    number: this.props.number || "",
    city: this.props.city || "",
    state: this.props.state || "",
    zip: this.props.zip || "",
    cell: this.props.cell || "",
    home: this.props.home || "",
    work: this.props.work || "",
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { address, address2, neighborhood, birth, city, rg, cpf, email, gender, healthPlanId, name, number, state, zip, cell, home, work } = this.state;
    const { id, onSubmit } = this.props;

    let errorMessage;
    const customer = { name };

    if (!cpf || CPF.isValid(cpf)) {
      customer.cpf = CPF.clear(cpf);
      customer.address = address;
      customer.address2 = address2;
      customer.neighborhood = neighborhood;
      customer.birth = birth;
      customer.rg = rg;
      customer.email = email;
      customer.gender = gender;
      customer.healthPlanId = healthPlanId;
      customer.number = number;
      customer.state = state;
      customer.city = city;
      customer.zip = zip;
      customer.cell = cell;
      customer.home = home;
      customer.work = work;
    } else {
      errorMessage = 'CPF inválido';
    }
    onSubmit(id, customer, errorMessage);
  };

  render() {
    const { address, address2, neighborhood, birth, city, rg, cpf, email, gender, healthPlanId, name, number, state, zip, cell, home, work } = this.state;
    const { errorMessage, onClose, title } = this.props;
    const states = [
      { key: 'AC', value: 'AC', text: 'Acre' },
      { key: 'AL', value: 'AL', text: 'Alagoas' },
      { key: 'AP', value: 'AP', text: 'Amapá' },
      { key: 'AM', value: 'AM', text: 'Amazonas' },
      { key: 'BA', value: 'BA', text: 'Bahia' },
      { key: 'CE', value: 'CE', text: 'Ceará' },
      { key: 'DF', value: 'DF', text: 'Distrito Federal' },
      { key: 'ES', value: 'ES', text: 'Espírito Santo' },
      { key: 'GO', value: 'GO', text: 'Goiás' },
      { key: 'MA', value: 'MA', text: 'Maranhão' },
      { key: 'MT', value: 'MT', text: 'Mato Grosso' },
      { key: 'MS', value: 'MS', text: 'Mato Grosso do Sul' },
      { key: 'MG', value: 'MG', text: 'Minas Gerais' },
      { key: 'PA', value: 'PA', text: 'Pará' },
      { key: 'PB', value: 'PB', text: 'Paraíba' },
      { key: 'PR', value: 'PR', text: 'Paraná' },
      { key: 'PE', value: 'PE', text: 'Pernambuco' },
      { key: 'PI', value: 'PI', text: 'Piauí' },
      { key: 'RJ', value: 'RJ', text: 'Rio de Janeiro' },
      { key: 'RN', value: 'RN', text: 'Rio Grande do Norte' },
      { key: 'RS', value: 'RS', text: 'Rio Grande do Sul' },
      { key: 'RO', value: 'RO', text: 'Rondônia' },
      { key: 'RR', value: 'RR', text: 'Roraima' },
      { key: 'SC', value: 'SC', text: 'Santa Catarina' },
      { key: 'SP', value: 'SP', text: 'São Paulo' },
      { key: 'SE', value: 'SE', text: 'Sergipe' },
      { key: 'TO', value: 'TO', text: 'Tocantins' },
    ];

    const genders = [
      { key: 'f', value: 'f', text: 'Feminino' },
      { key: 'm', value: 'm', text: 'Masculino' },
    ];

    return (
      <Modal size="large" open onClose={onClose}>
        <Modal.Header content={title} />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} error={!!errorMessage}>
            <Form.Group>
              <Form.Input
                width={12}
                required
                autoFocus
                label="Nome"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
              <Form.Select
                width={4}
                label='Sexo'
                name='gender'
                value={gender}
                options={genders}
                placeholder='Sexo'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label={'Nascimento'}
                width={3}
                type="date"
                name="birth"
                value={birth}
                onChange={this.handleChange}
              />
              <Form.Input
                width={3}
                label={'CPF (apenas números)'}
                name="cpf"
                value={cpf}
                pattern="\d*"
                maxLength={11}
                onChange={this.handleChange}
              />
              <Form.Input
                width={4}
                label={'Identidade'}
                name="rg"
                value={rg}
                onChange={this.handleChange}
              />
              <Form.Input
                width={6}
                label={'Email'}
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <HealthPlanSelector
                onChange={this.handleChange}
                healthPlanId={healthPlanId}
              />
              <Form.Input
                width={3}
                label="Telefone Celular"
                name="cell"
                value={cell}
                onChange={this.handleChange}
              />
              <Form.Input
                width={3}
                label="Telefone Residencial"
                name="home"
                value={home}
                onChange={this.handleChange}
              />
              <Form.Input
                width={3}
                label="Telefone Comercial"
                name="work"
                value={work}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={12}
                label="Endereço"
                name="address"
                value={address}
                onChange={this.handleChange}
              />
              <Form.Input
                width={4}
                label="Número"
                name="number"
                value={number}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={10}
                label="Complemento"
                name="address2"
                value={address2}
                onChange={this.handleChange}
              />
              <Form.Input
                width={6}
                label="Bairro"
                name="neighborhood"
                value={neighborhood}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={8}
                label="Cidade"
                name="city"
                value={city}
                onChange={this.handleChange}
              />
              <Form.Select
                width={4}
                label='Estado'
                name='state'
                value={state}
                options={states}
                placeholder='Estado'
                onChange={this.handleChange}
              />
              <Form.Input
                width={4}
                label="CEP"
                name="zip"
                value={zip}
                onChange={this.handleChange}
              />
            </Form.Group>
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
