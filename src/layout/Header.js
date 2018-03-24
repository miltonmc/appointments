import React from 'react';
import LogoutButton from 'authentication/LogoutButton';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import appConfig from 'appConfig';
import logo from "logo.svg";
import './Header.css';

export default ({match}) => (
  <header>
    <Menu borderless size="small">
      <Menu.Item header><img alt={appConfig.fullName} src={logo} /></Menu.Item>
      <Menu.Item as={Link} to="/" name="Convênios" active />
      <Menu.Item position="right">
        <LogoutButton />
      </Menu.Item>
    </Menu>
  </header>
);
