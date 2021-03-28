import { format } from 'cnpj';
import React, { useState } from 'react';
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';

const HealthPlan = ({
  cnpj: cnpjProps = '',
  errorMessage,
  id,
  isNew,
  name: nameProps = '',
  onClose,
  onSubmit,
  title,
}) => {
  const [healthPlan, setHealthPlan] = useState({ cnpj: cnpjProps, name: nameProps });

  const handleChange = (e, { name, value }) => setHealthPlan((healthPlan) => ({ ...healthPlan, [name]: value }));

  const { name, cnpj } = healthPlan;

  const handleSubmit = () => {
    onSubmit(id, cnpj, name);
  };

  const isNotNew = !isNew;
  return (
    <Modal size="mini" open onClose={onClose}>
      <Modal.Header content={title} />
      <Modal.Content>
        <Form onSubmit={handleSubmit} error={!!errorMessage}>
          <Form.Input
            required={isNew}
            label={`CNPJ${isNew ? ' (apenas números)' : ''}`}
            name="cnpj"
            value={isNew ? cnpj : format(cnpj)}
            autoFocus={isNew}
            disabled={isNotNew}
            pattern="\d*"
            maxLength={14}
            onChange={handleChange}
          />
          <Form.Input required label="Nome" name="name" value={name} autoFocus={isNotNew} onChange={handleChange} />
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

export default HealthPlan;
