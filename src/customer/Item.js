import React, { Component } from "react";
import { Button, Form, Icon, Message, Modal } from "semantic-ui-react";
import CPF from "cpf";
import HealthPlanSelector from "shared/HealthPlanSelector";
import StateSelect from "shared/StatePlanSelect";
import Sponsor from "./Sponsor";

const addressTypes = [
  { key: 'home', value: 'home', text: 'Casa' },
  { key: 'work', value: 'work', text: 'Trabalho' },
  { key: 'other', value: 'other', text: 'Outro' },
];

const genders = [
  { key: 'f', value: 'f', text: 'Feminino' },
  { key: 'm', value: 'm', text: 'Masculino' },
];

export default class Item extends Component {
  state = {
    addressType: this.props.addressType || "",
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
    facebook: this.props.facebook || "",
    instagram: this.props.instagram || "",
    twitter: this.props.twitter || "",
    linkedin: this.props.linkedin || "",
    sponsor: this.props.sponsor || "",
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { addressType, address, address2, neighborhood, birth, city, rg, cpf, email, gender, healthPlanId, name, number, state, zip, cell, home, work, facebook, instagram, twitter, linkedin, sponsor } = this.state;
    const { id, onSubmit } = this.props;

    let errorMessage;
    const customer = { name };

    if (!cpf || CPF.isValid(cpf)) {
      customer.cpf = CPF.clear(cpf);
      customer.addressType = addressType;
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
      customer.facebook = facebook;
      customer.instagram = instagram;
      customer.twitter = twitter;
      customer.linkedin = linkedin;
      customer.sponsor = sponsor;
    } else {
      errorMessage = 'CPF inválido';
    }
    onSubmit(id, customer, errorMessage);
  };

  render() {
    const { addressType,address, address2, neighborhood, birth, city, rg, cpf, email, gender, healthPlanId, name, number, state, zip, cell, home, work, facebook, instagram, twitter, linkedin, sponsor } = this.state;
    const { errorMessage, onClose, title } = this.props;

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
                width={4}
                label="Facebook"
                name="facebook"
                value={facebook}
                onChange={this.handleChange}
              />
              <Form.Input
                width={4}
                label="Instagram"
                name="instagram"
                value={instagram}
                onChange={this.handleChange}
              />
              <Form.Input
                width={4}
                label="Twitter"
                name="twitter"
                value={twitter}
                onChange={this.handleChange}
              />
              <Form.Input
                width={4}
                label="LinkedIn"
                name="linkedin"
                value={linkedin}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
            <Form.Select
                width={4}
                label='Tipo'
                name='addressType'
                value={addressType}
                options={addressTypes}
                placeholder='Tipo'
                onChange={this.handleChange}
              />
              <Form.Input
                width={10}
                label="Endereço"
                name="address"
                value={address}
                onChange={this.handleChange}
              />
              <Form.Input
                width={2}
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
              <StateSelect
                value={state}
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
            <Sponsor cpf={sponsor} onChange={this.handleChange}/>
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
