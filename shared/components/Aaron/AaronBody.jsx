import React, { PropTypes, Component } from 'react';
import Helmet from "react-helmet";
import { Link, browserHistory } from 'react-router';
import Donate from '../Home/Donate';

class AaronBody extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <section className="container content-section text-center">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2">
            <h2>The Lukas Legacy & The Aaron Project</h2>
            <img src="/img/aaron-profile.jpg" className="lukas-container__image"  />
            <p>
              On September 5th, 2016 Lukas Oelke passed away, ending what we called The Lukas Project.  Our fight was over, but we made one last promise to our friend: to keep his memory alive in the help we provide to other young people with cancer.  In this effort we make sure Lukas’ death was not in vain.  <b>We call it The Lukas Legacy.</b>
            </p>
            <p>
              The first recipient of The Lukas Legacy is Aaron Konkin.  Aaron is similar to Lukas in a lot of ways. For one, he was diagnosed in a similar place in life at the age of 24. He had recently graduated from UVic with a degree in computer science and applied ethics. He was fit, spreading his workout routine between the gym and various Martial Arts disciplines. Aaron also found himself a new girlfriend, whom he liked a lot. The universe, it appeared, was on his side.
            </p>
            <p>
              All of that came crashing down in February of 2016, when a persistent dry cough led to a diagnosis of a rare type of cancer called Alveolar Soft Part Sarcoma.
            </p>
            <p>
              Due to complications from his disease Aaron has been forced into unemployment. He has no extended medical coverage as his family plan ceased upon his graduation. In addition, his treatment regime requires many supplements, which cost roughly $150 a day. On top of that, Aaron’s father and step-mother have less time to work and must now routinely incur the travel costs between Vancouver and Vernon.  Moreover, they do not have the financial means to cover over $5000 each month in Aarons’ living expenses.
            </p>

            <p>
              Sadly, this isn’t the first-time Aaron’s family has fallen upon financial hardship. Several years ago, for instance, Aaron’s parents almost lost everything after real-estate investments turned sour due to a market collapse. Aaron’s father, Kenn, spent 18 months out of Province working disaster relief to bring his family back from the brink of financial ruin.  That is, until they received the news that their son was diagnosed with cancer.
            </p>
            <p>
              Once again, Aaron’s family has found themselves in a tough financial situation, but this time their son’s life is also at stake. Aaron’s father has had to drop all his employment responsibilities and is now staying in Vancouver full time to act as the primary care giver of his son.
            </p>
            <p>
              Kids Without Yachts is here to keep Aaron’s boat afloat. But we can’t do it without your support. Many of you rallied behind Lukas when he was diagnosed and we are asking you to give that same love and support to Aaron. As always, any donations made through our website are directed to our current “Project” AKA Aaron.  No KWY member receives ANY salary, or monetary benefit from donations received.
            </p>
            <p>
              We’ve also recently included an option to be a <Link to="/donate" className="text-default"> monthly donor to Kids Without Yachts.</Link> This is by far the most effective way to support Aaron. It allows us to budget, plan ahead, keep our administration costs lower, and organize ourselves in the most efficient way possible.
            </p>
            <p>
              In addition to donating now, please join us March 29th at the Local Public Eatery just outside of Kits Beach on Cornwall. We have a reputation to uphold and we promise it’ll be a ton of fun ;)
            </p>
          </div>
        </div>
        <Donate />
      </section>
    );
  }
}

export default AaronBody;
//
// <li>
//     <a href="#" className="btn btn-default btn-lg"><i className="fa fa-facebook-square fa-fw"></i> <span className="network-name">Event Page</span></a>
// </li>
