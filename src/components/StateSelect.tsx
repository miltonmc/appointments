import React from 'react';
import { Form } from 'semantic-ui-react';

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

const StateSelect = ({ value, onChange }: { value: string; onChange: () => void }) => (
  <Form.Select
    search
    width={4}
    label="Estado"
    name="state"
    value={value}
    options={states}
    placeholder="Estado"
    onChange={onChange}
  />
);

export default StateSelect;
