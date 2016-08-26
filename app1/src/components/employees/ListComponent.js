'use strict';
import React from 'react';
import Card from './CardComponent';

require('styles/employees/List.css');
class ListComponent extends React.Component {
  render() {
    let employee = {
      'ssn': '904-0342-1162',
      'birthday': '1995-04-23',
      'age': 21,
      'firstName': 'Timmothy',
      'lastName': 'McClure',
      'fullName': 'Timmothy McClure',
      'title': 'Forward Creative Producer',
      'jobDescriptor': 'International',
      'jobArea': 'Implementation',
      'jobType': 'Architect',
      'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/itstotallyamy/128.jpg',
      'email': 'Bradford78@gmail.com'
    };

    return (
      <div className='list-component'>
        <Card {...employee} />
      </div>
    );
  }
}

ListComponent.displayName = 'EmployeesListComponent';

// Uncomment properties you need
// ListComponent.propTypes = {};
// ListComponent.defaultProps = {};

export default ListComponent;
