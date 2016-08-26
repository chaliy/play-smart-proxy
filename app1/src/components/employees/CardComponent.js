'use strict';

import React from 'react';

require('styles/employees/Card.css');
class CardComponent extends React.Component {
  render() {
    let props = this.props;
    return (
      <div className="card-component">
        <div className="row">
              <div className="col-sm-4">
                  <div className="employee-member">
                      <img className="img-responsive img-circle" alt="" src={props.avatar} />
                      <h4>{props.fullName}</h4>
                      <p className="text-muted">{props.jobType}</p>
                      <ul className="list-inline social-buttons">
                          <li><a href={'mailto:' + props.email}><i className="fa fa-envelope"></i></a></li>
                          <li><a href="#"><i className="fa fa-phone"></i></a></li>
                      </ul>
                  </div>
              </div>
              <div className="col-sm-8">
                  <div className="employee-details list-group">
                    <div className="list-group-item">
                      <label>SSN</label>
                      <h4 className="list-group-item-heading">{props.ssn}</h4>
                    </div>
                    <div className="list-group-item">
                      <label>Job Title</label>
                      <h4 className="list-group-item-heading">{props.jobArea} - {props.jobType}</h4>
                    </div>
                    <div className="list-group-item">
                      <label>Birthday</label>
                      <h4 className="list-group-item-heading">{props.birthday}</h4>
                    </div>
                    <a className="list-group-item" href={'tel:' + props.phone}>
                      <label>Phone</label>
                      <h4 className="list-group-item-heading">{props.phone}</h4>
                    </a>
                    <a className="list-group-item" href={'mailto:' + props.email}>
                      <label>Email</label>
                      <h4 className="list-group-item-heading">{props.email}</h4>
                    </a>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

CardComponent.displayName = 'EmployeesCardComponent';

// Uncomment properties you need
// CardComponent.propTypes = {};
// CardComponent.defaultProps = {};

export default CardComponent;
