import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import appConfig from '../appConfig';
import { CALENDAR, CUSTOMER, EVENT, HEALTH_PLAN } from '../constants/Routes';
import logo from '../logo.svg';
import LogoutButton from './LogoutButton';

const Header = () => (
  <header>
    <Menu borderless stackable size="small">
      <Menu.Item header>
        <img alt={appConfig.fullName} src={logo} />
      </Menu.Item>
      <Menu.Item as={NavLink} to={CALENDAR} exact name="Agenda" />
      <Menu.Item as={NavLink} to={EVENT} name="Consultas" />
      <Menu.Item as={NavLink} to={CUSTOMER} name="Paciente" />
      <Menu.Item as={NavLink} to={HEALTH_PLAN} name="Convênios" />
      <Menu.Item position="right">
        <LogoutButton />
      </Menu.Item>
    </Menu>
  </header>
);

export default Header;
