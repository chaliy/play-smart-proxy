'use strict';
import React from 'react';
import Card from './CardComponent';

require('styles/employees/List.css');
class ListComponent extends React.Component {
  render() {
    let { data } = this.props;

    return (
      <div className='list-component'>
        {data.map(item => (
            <Card key={item.id} {...item} />
        ))}
      </div>
    );
  }
}

ListComponent.displayName = 'EmployeesListComponent';

// Uncomment properties you need
// ListComponent.propTypes = {};
// ListComponent.defaultProps = {};

export default ListComponent;
