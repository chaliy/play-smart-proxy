import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

import Employees from './Employees';

require('normalize.css/normalize.css');
require('styles/App.css');
class App extends Component {
  render() {
    return <div>
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
        <Employees />
      </div>
    </div>
  }
}

export default App;
