import React, { PropTypes } from 'react';
import moment from 'moment'

const MessagesView = React.createClass({
  render() {
    const { messages } = this.props
    // debugger;

    const nodes = messages.map(message =>
      <div>
        <div className="row row--padding-top-bottom">
          <div className="col-md-3">{message.emailFrom}</div>
          <div className="col-md-3">{message.title}</div>
          <div className="col-md-3"><p className="admin__messages-grid--word-wrap">{message.message}</p></div>
          <div className="col-md-3">{moment(message.dateAdded).format('MMMM Do YYYY, h:mm a')}</div>
        </div>
        <hr />
      </div>
    )

    return(
      <div className="container content-section text-center">
        <h3>'Contact Us' Messages</h3>
        <div>
          <div className="row row--padding-top-bottom">
            <div className="col-lg-3"><h4>From</h4></div>
            <div className="col-lg-3"><h4>Title</h4></div>
            <div className="col-lg-3"><h4>Message</h4></div>
            <div className="col-lg-3"><h4>Date sent</h4></div>
          </div>
          {nodes}
        </div>
      </div>
    );
  }
});

MessagesView.propTypes = {
  messages: PropTypes.array
}

export default MessagesView;
