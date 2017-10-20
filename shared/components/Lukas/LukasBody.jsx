import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Donate from '../Home/Donate';

class LukasBody extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
  }

  handleDoubleClick() {
    browserHistory.push('/admin')
  }
  render() {
    return (
      <section className="container content-section text-center">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2">
            <h2>How We've Helped</h2>
            <img src="/img/lukas_studly.jpg" className="animated fadeIn lukas-container__image"  />
              <div className="paragraph-text">
                <p>
                  With considerable sadness we advise that Lukas Oelke breathed his last in the early afternoon of September 5th, 2016. Lukas was incredible to the end, showing his love and acknowledging his family and friends with claps of his hands and gestures of thumbs up.
                </p>
                <p>
                Although this was not the end we sought to achieve, we are mightily proud of The Lukas Project. In our minds The Lukas Project represents human compassion to it’s fullest extent. We are overblown by the support we’ve received. Never before have we seen such a large community come together to aide one of their own.
                </p>
                <p>
                As always, every dollar received is geared towards providing young individuals with cancer the financial means to reap the rewards of both the public and private healthcare sectors. This money was donated by you. You should be able to see exactly how it was spent. Here it is:
                </p>
                <p>
                  <h2>$55,177 has been invested into The Lukas Project. Of that:</h2>
                  <p>$30,807 went directly into the pockets of Lukas’ family for living costs</p>
                  <p>$10,500 was given to the family for rent towards a wheelchair accessible apartment</p>
                  <p>$8,494 was spent on cremation & funeral services</p>
                  <p>$3,376 was spent on a specialized custom wheelchair</p>
                  <p>$1,000 was spent on a mechanical bed</p>
                  <p> $1000 miscellaneous  </p>
                </p>
                <p>
                  Outside of the above, any funds received has gone towards event management, merchandise, and minor operating costs.
                </p>
                <p>
                  On a personal note, this experience has made all of us all too keenly aware of the devastating consequences of cancer. The grief we feel for our fallen brother is inexplicable.
                </p>
                <p>
                  We can think of but one way to honour Lukas: One day, within our lifetime, a young person with cancer – the next “Lukas” – will be diagnosed. And he will make it.
                </p>
                <p>
                  We invite every one of you who invested yourself in Lukas to refocus your energy towards achieving this goal. The Lukas Project may be over, but we’re not stopping. We're hoping you won’t either.
                </p>
                <p>
                  In the words of <a className="text-default" href="http://www.martinamisweb.com/" target="_blank">Martin Amis</a>, "This is where we really go when we die: into the hearts of those who remember us".
                </p>
              </div>
          </div>
        </div>
        <Donate />
      </section>
    );
  }
}

export default LukasBody;
//
// <li>
//     <a href="#" className="btn btn-default btn-lg"><i className="fa fa-facebook-square fa-fw"></i> <span className="network-name">Event Page</span></a>
// </li>
