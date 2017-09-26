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
            <h2> The Lukas Legacy & The Aaron Project</h2>
            <img src="/img/aaron-profile.jpg" className="lukas-container__image"  />
            <div className="paragraph-text">
              <p>It is with a heavy heart that we announce the peaceful passing of Aaron Konkin on September 16th, 2017 surrounded by his friends and family. </p>

              <p>Aaron was not just an inspiration to his friends and family, he made a lasting impression on the Kids Without Yachts team. He was dedicated to his fight, but also felt strongly about keeping a sense of normalcy.  The first time we hung out with Aaron we went clay shooting in Squamish. The second time we tossed a frisbee in the park. Here we had a young adult living with stage 4 Alveolar Soft Part Sarcoma who made it a priority to be doing great outdoor activities with his friends, just like any of us would. </p>

              <p>This was something we could strongly relate to from personal experience. We believe young adults living with cancer should always have time to be a <span className="text-default"> Kid.</span> </p>

              <p>Aaron had many hurdles thrown at him: he took each one in stride and looked on for the next challenge. Ultimately, Aaron succumbed to his disease, but his undying dedication to getting better remains a beacon of hope to all the other Kids out there.</p>

              <p>The Kids Without Yachts organization, which includes <span className="text-default" >you</span>, were able to raise <span className="text-large">$12, 800</span> that went directly into Aaron’s pockets.</p>

              <p>On a personal note, we would all like to thank Brenda, Ken, Anthony and Michelle, and all others who were of paramount importance in helping Aaron. </p>
            </div>
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
