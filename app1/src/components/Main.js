require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

import EmployeeList from './employees/ListComponent';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Example Human Resources System
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem href="#">Refresh</NavItem>
          </Nav>
        </Navbar>
        <div className="container">
          <EmployeeList />
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
