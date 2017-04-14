import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function About (props, context) {
  return (
    <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="section-heading">Who are We</h1>
                    <p class="lead section-lead">Getting you the Yacht</p>
                    <p class="section-paragraph">Kids Without Yachts provides low-income families affected by cancer with the financial means to pursue healthcare objectives that lie outside of the public sector. These objectives include private medical expenses, clinical trial enrollment, and living/travel expenses. Specifically, we target individuals under 30 with advanced cancer diagnoses who come from low-income families.</p>
                    {
                      context.router.isActive('/', true) ? <a href="#story" className="btn btn-circle page-scroll"><i className="fa fa-angle-double-down animated"></i></a> : ""
                    }
                </div>
            </div>
        </div>
    </section>
  );
}

About.contextTypes = {
  router: React.PropTypes.object,
};

export default About;



//
// {
//   context.router.isActive('/', true) ? <a href="#story" className="btn btn-circle page-scroll"><i className="fa fa-angle-double-down animated"></i></a>
// }

// {
//   context.router.isActive('/', true) ? <a href="#story" className="btn btn-circle page-scroll"><i className="fa fa-angle-double-down animated"></i></a> : <a href="/#contact" className="btn btn-circle page-scroll"><i className="fa fa-angle-double-down animated"></i></a>
// }
