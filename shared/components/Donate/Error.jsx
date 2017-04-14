import React, { PropTypes } from 'react';



const ErrorView = React.createClass({
  render: function() {
    return(
      <div className="container content-section text-center">
        <h4>We Received an error from Stripe, either from your card or the amount you entered was invalid :( </h4>
      </div>
    );
  }
});


export default ErrorView;
