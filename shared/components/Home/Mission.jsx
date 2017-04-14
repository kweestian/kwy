import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Mission extends Component {
  constructor(props, context) {
    super(props, context);


    // not implicit binding of function in react

    this.contactUs = this.contactUs.bind(this);
    this.toggleContactForm = this.toggleContactForm.bind(this);
  }

  toggleContactForm() {
    this.props.toggleContactForm();
  }

  contactUs() {
    const emailFrom = this.refs.emailFrom.value || "";
    const message = this.refs.message.value || "";
    const title = this.refs.title.value || "";

    this.props.sendContactForm( emailFrom, title, message);
    this.toggleContactForm();
  }



  render() {
    const cls = this.props.showContactForm ? 'appear animated fadeInDown' : 'hidden';
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="section-heading">Is Kids Without Yachts for You ?</h1>
              <p className="lead section-lead">If you or a loved one is 30 years of age or under, battling advanced cancer, and from a low-middle income family, Kids Without Yachts is here to help you. We offer a range of services from pro-bono consulting services to financial assistance.</p>
              <p className="section-paragraph">If you require any information regarding navigating the public or private healthcare systems, feel free to <span className="text-default clicky" onClick={this.toggleContactForm}> contact us </span> or just send us an email to <a href="mailto:kidswithoutyachts@gmail.com" target="_blank" className="text-default">kidswithoutyachts@gmail.com</a>. Likewise, if you or a loved one requires financial assistance as a result of a cancer diagnosis, send us an message to find out if you can set up your very own “project” at Kids Without Yachts.</p>
              <a className='post-submit-button clicky' onClick={this.toggleContactForm}>Contact Us</a>
            </div>
          </div>
        </div>
        <div className={`form ${cls}`}>
          <div className='form-content'>
            <h2 className='form-title'>Tell us Everything</h2>
            <input placeholder="Email" className='form-field' ref="emailFrom" />
            <input placeholder="Subject" className='form-field' ref="title" />
            <textarea placeholder='Message' className='form-field' ref="message" />
            <a className='post-submit-button clicky' onClick={this.contactUs}>Send</a>
          </div>
        </div>
      </section>
    );
  }
}

Mission.contextTypes = {
  router: React.PropTypes.object,
};

Mission.propTypes = {
  showContactForm: PropTypes.bool.isRequired,
  toggleContactForm: PropTypes.func.isRequired,
  sendContactForm: PropTypes.func.isRequired,
};

export default Mission;
