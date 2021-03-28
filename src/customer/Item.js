import CPF from 'cpf';
import React, { useState } from 'react';
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';
import StateSelect from '../components/StateSelect';
import HealthPlanSelect from '../shared/HealthPlanSelect';
import Sponsor from './Sponsor';

const addressTypes = [
  { key: 'home', value: 'home', text: 'Residencia' },
  { key: 'work', value: 'work', text: 'Comercial' },
  { key: 'other', value: 'other', text: 'Outro' },
];

const genders = [
  { key: 'f', value: 'f', text: 'Feminino' },
  { key: 'm', value: 'm', text: 'Masculino' },
];

const Customer = ({ errorMessage, healthPlans, onClose, title, id, onSubmit, ...customerProp }) => {
  const [customer, setCustomer] = useState({
    addressType: customerProp.addressType ?? '',
    address: customerProp.address ?? '',
    address2: customerProp.address2 ?? '',
    neighborhood: customerProp.neighborhood ?? '',
    birth: customerProp.birth ?? '',
    rg: customerProp.rg ?? '',
    cpf: customerProp.cpf ?? '',
    email: customerProp.email ?? '',
    gender: customerProp.gender ?? '',
    healthPlanId: customerProp.healthPlanId ?? '',
    name: customerProp.name ?? '',
    number: customerProp.number ?? '',
    city: customerProp.city ?? '',
    state: customerProp.state ?? '',
    zip: customerProp.zip ?? '',
    cell: customerProp.cell ?? '',
    home: customerProp.home ?? '',
    work: customerProp.work ?? '',
    facebook: customerProp.facebook ?? '',
    instagram: customerProp.instagram ?? '',
    twitter: customerProp.twitter ?? '',
    linkedin: customerProp.linkedin ?? '',
    sponsor: customerProp.sponsor ?? '',
  });

  const {
    addressType,
    address,
    address2,
    neighborhood,
    birth,
    city,
    rg,
    cpf,
    email,
    gender,
    healthPlanId,
    name,
    number,
    state,
    zip,
    cell,
    home,
    work,
    facebook,
    instagram,
    twitter,
    linkedin,
    sponsor,
  } = customer;

  const handleChange = (e, { name, value }) => setCustomer((customer) => ({ ...customer, [name]: value }));

  const handleSubmit = () => {
    const errorMessage = !cpf && CPF.isValid(cpf) ? null : 'CPF inválido';

    onSubmit(id, customer, errorMessage);
  };

  return (
    <Modal size="large" open onClose={onClose}>
      <Modal.Header content={title} />
      <Modal.Content>
        <Form onSubmit={handleSubmit} error={!!errorMessage}>
          <Form.Group>
            <Form.Input width={12} required autoFocus label="Nome" name="name" value={name} onChange={handleChange} />
            <Form.Select
              width={4}
              label="Sexo"
              name="gender"
              value={gender}
              options={genders}
              placeholder="Sexo"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input label={'Nascimento'} width={3} type="date" name="birth" value={birth} onChange={handleChange} />
            <Form.Input
              width={3}
              label={'CPF (apenas números)'}
              name="cpf"
              value={cpf}
              pattern="\d*"
              maxLength={11}
              onChange={handleChange}
            />
            <Form.Input width={4} label={'Identidade'} name="rg" value={rg} onChange={handleChange} />
            <Form.Input width={6} label={'Email'} name="email" value={email} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <HealthPlanSelect width={7} onChange={handleChange} options={healthPlans} value={healthPlanId} />
            <Form.Input width={3} label="Telefone Celular" name="cell" value={cell} onChange={handleChange} />
            <Form.Input width={3} label="Telefone Residencial" name="home" value={home} onChange={handleChange} />
            <Form.Input width={3} label="Telefone Comercial" name="work" value={work} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Input width={4} label="Facebook" name="facebook" value={facebook} onChange={handleChange} />
            <Form.Input width={4} label="Instagram" name="instagram" value={instagram} onChange={handleChange} />
            <Form.Input width={4} label="Twitter" name="twitter" value={twitter} onChange={handleChange} />
            <Form.Input width={4} label="LinkedIn" name="linkedin" value={linkedin} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Select
              width={4}
              label="Tipo"
              name="addressType"
              value={addressType}
              options={addressTypes}
              placeholder="Tipo"
              onChange={handleChange}
            />
            <Form.Input width={10} label="Endereço" name="address" value={address} onChange={handleChange} />
            <Form.Input width={2} label="Número" name="number" value={number} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Input width={10} label="Complemento" name="address2" value={address2} onChange={handleChange} />
            <Form.Input width={6} label="Bairro" name="neighborhood" value={neighborhood} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Input width={8} label="Cidade" name="city" value={city} onChange={handleChange} />
            <StateSelect value={state} onChange={handleChange} />
            <Form.Input width={4} label="CEP" name="zip" value={zip} onChange={handleChange} />
          </Form.Group>
          <Sponsor cpf={sponsor} onChange={handleChange} />
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
};

export default Customer;
