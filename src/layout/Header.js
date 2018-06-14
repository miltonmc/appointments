import React from 'react';
import LogoutButton from 'authentication/LogoutButton';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import appConfig from 'appConfig';
import logo from "logo.svg";
import './Header.css';
import { CALENDAR, CUSTOMER, HEALTH_PLAN } from '../shared/Routes';

export default ({match}) => (
  <header>
    <Menu borderless size="small">
      <Menu.Item header><img alt={appConfig.fullName} src={logo} /></Menu.Item>
      <Menu.Item as={Link} to={CALENDAR} name="Agenda" active />
      <Menu.Item as={Link} to={CUSTOMER} name="Paciente" />
      <Menu.Item as={Link} to={HEALTH_PLAN} name="Convênios" />
      <Menu.Item position="right">
        <LogoutButton />
      </Menu.Item>
    </Menu>
  </header>
);
