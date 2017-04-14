import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNotification } from '../../redux/actions/actions';
import NotificationSystem from 'react-notification-system';

class NotificationContainer extends Component {

  constructor(props, context) {
    super(props, context);

    this._addNotif = this._addNotif.bind(this);
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  _addNotif(event) {
    event.preventDefault();
    this.notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  }

  componentWillReceiveProps(newProps) {
    const { message, level } = newProps.notification;

    this.notificationSystem.addNotification({
      message,
      level,
      position: 'tc',
    });
  }

  render() {
    var style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          margin: '50px 0 0 0',
        },
      }
    }
    return (
      <NotificationSystem ref="notificationSystem" style={style} />
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notificationReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addNotification
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
