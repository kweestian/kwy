import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Donate from './Donate';

function Intro (props, context) {

  return (
  <div>
    <header className="image-bg-fluid-height">
    </header>

    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="section-heading">What We Do</h1>
            <p className="lead section-lead">So what's a Yacht anyways?</p>
            <p className="section-paragraph">Kids Without Yachts provides low-income families affected by cancer with the financial means to pursue healthcare objectives that lie outside of the public sector <span className="text-default">(A.K.A. The Yacht).</span> These objectives include private medical expenses, clinical trial enrollment, and living/travel expenses. Specifically, we target individuals under 30 with advanced cancer diagnoses who come from low-income families.</p>
          </div>
        </div>
      </div>
    </section>

    <Donate />

    <aside className="image-bg-fixed-height"></aside>
  </div>
  );

}

Intro.contextTypes = {
  router: React.PropTypes.object,
};

export default Intro;
//
// <video loop muted autoPlay poster="img/sail.jpg" className="fullscreen-bg__video">
//   <source src="video/sail.webm" type="video/webm"/>
//   <source src="video/sail.webm" type="video/webm"/>
//   <source src="video/sail.webm" type="video/webm"/>
// </video>

// <img className="img-responsive img-center" src="/img/rsz_kids_without_logo_white.png" alt="" />
