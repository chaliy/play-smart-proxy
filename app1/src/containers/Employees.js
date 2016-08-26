import React, { Component, PropTypes } from 'react';
import EmployeeList from '../components/employees/ListComponent';

class Employees extends Component {

  constructor(props){
    super(props);

    this.state = {
      employees: []
    };
  }

  componentWillMount() {
    let self = this;
    fetch('http://localhost:10010/employee')
      .then(r => r.json())
      .then(payload => {
        self.setState({
          employees: payload
        });
      });
  }

  render() {
    const { employees } = this.state;

    return <EmployeeList data={employees} />;
  }
}

Employees.propTypes = {};

export default Employees;
