import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="section-heading">Get in Touch</h1>
            <p className="lead section-lead">Don't be Shy</p>
            <div className="section-paragraph">
              <div className="row">
                <div className="col-lg-12">
                  <a href="https://www.facebook.com/kidswithoutyachts/?ref=br_tf" target="_blank"><i className="fa fa-facebook-square fa-fw"></i>Like Us</a>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <a href="https://twitter.com/@kwyachts" target="_blank"><i className="fa fa-twitter fa-fw"></i>Tweet @ Us</a>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <a href="https://www.instagram.com/kidswithoutyachts/?hl=en" target="_blank"><i className="fa fa-instagram fa-fw"></i>Follow Us</a>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <a href="mailto:kidswithoutyachts@gmail.com" target="_blank"><i className="fa fa-envelope fa-fw"></i>Email Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p>Copyright &copy; Kids Without Yachts 2016</p>
          </div>
        </div>
      </div>
    </footer>
 );
}

export default Footer;
