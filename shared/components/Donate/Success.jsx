import React, { PropTypes } from 'react';



const Success = React.createClass({
  render: function() {
    return(
      <div className="container content-section text-center">
        <h4>Thank you for donating </h4>
        <h6> a confirmation email will be sent to you shortly </h6>
      </div>
    );
  }
});


export default Success;
