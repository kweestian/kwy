import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Story (props, context) {
  return (
    <section id="story" className="container content-section text-center">
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <h2>Our Story </h2>
          <p>Like many cancer initiatives, Kids Without Yachts was born out of tragedy. When our friend, Lukas Oelke, was diagnosed with Osteosarcoma, a rare form of bone cancer, we soon realized that certain individuals can slip through the cracks of our public healthcare system. Kids Without Yachts was born out of a desire to fill these gaps.</p>
          <p>Allow us to explain. When an individual receives a cancer diagnosis that is deemed incurable, public resources are allocated heavily towards those with a better prognosis. This is how our friend Lukas found himself behind red tape and stuck at the back of long waitlists. Doctors didn’t answer his phone calls and promising treatments were prioritized for others who had a better chance at full recovery.</p>
          <p>We understand why this happens. Every publicly funded institution in Canada, including our healthcare system, operates under the principle that there are limited funds to go around. Who gets what, when, where, and how is a calculated decision. Thus, Lukas found himself on the wrong end of that spreadsheet.</p>
          <p>We believe that every young person deserves more, regardless of their socioeconomic circumstances. Ask yourself: if your child received an advanced cancer diagnosis, would doing anything other than seeking the best treatments available be acceptable?</p>
          <p>No members of KWY receive compensation and outside of slim operating costs, every dollar received goes towards medical treatments and directly related costs. Simply put, we operate lean and mean.</p>
        </div>
      </div>
    </section>
  );
}

export default Story;
