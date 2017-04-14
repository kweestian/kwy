import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Donate (props, context) {
  return (
    <section className="container text-center">
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <h2>Help Now</h2>
          <Link to="/donate">
            <div className="btn btn-default">
              DONATE
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Donate;
