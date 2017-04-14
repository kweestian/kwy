import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Config from '../../../server/config';

// const ACTIVE ={ 'backgroundColor': 'rgba(255,255,255,.3)' };

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar__logo-box--inline-flex">
              <div className="navbar-left"><img className="img-responsive navbar__logo--fixed-height" src="/img/rsz_kids_without_logo_white.png" alt="" /> </div>
              <div className="navbar-brand navbar-brand__text--small-screens">Kids Without Yachts</div>
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                  <li>
                    <Link to="/story">
                      Who We Are
                    </Link>
                  </li>
                  <li>
                    <Link to="/aaron">
                      Aaron
                    </Link>
                  </li>
                  <li>
                    <Link to="/lukas">
                      Lukas
                    </Link>
                  </li>
                  <li>
                    <Link to="/donate">
                      Donate
                    </Link>
                  </li>
                  <li>
                    <Link to="/team">
                      Meet the Team
                    </Link>
                  </li>
              </ul>
          </div>
        </div>
      </nav>
    );
  }

}

Navbar.contextTypes = {
  router: React.PropTypes.object,
};

Navbar.propTypes = {
  onClick: PropTypes.func,
  handleLogoClick: PropTypes.func,
};

export default Navbar;



// <nav className="navbar navbar-custom navbar-fixed-top" role="navigation">
//   <div className="container">
//       <div className="navbar-header">
//           <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
//               <i className="fa fa-bars"></i>
//           </button>
//           <div className="navbar-brand">
//             {
//               context.router.isActive('/', true) ? <a className="page-scroll" href="#page-top" ><img className="navbar__logo--fixed-width" src="/img/rsz_kids_without_logo_white.png" /> <span className="light">Kids Without</span> Yachts</a> : <Link to="/" ><img className="navbar__logo--fixed-width" src="/img/rsz_kids_without_logo_white.png" /> <span className="light">Kids Without</span> Yachts</Link>
//             }
//           </div>
//       </div>
//       <div className="collapse navbar-collapse navbar-right navbar-main-collapse">
//           <ul className="nav navbar-nav">
//               <li className="hidden">
//                 {
//                   context.router.isActive('/', true) ? <a href="#page-top" className="page-scroll"></a> : <Link to="/"></Link>
//                 }
//               </li>
//               <li>
//                 {
//                   context.router.isActive('/', true) ? <a href="#story" className="page-scroll">Story</a> : <Link to="/story">Story</Link>
//                 }
//               </li>
//               <li>
//                 <Link to="/lukasproject"> The Lukas Project </Link>
//               </li>
//               <li>
//                 <Link to="/donate"> Donate </Link>
//               </li>
//               <li>
//                 {
//                   context.router.isActive('/', true) ? <a href="#contact" className="page-scroll">Contact us</a> : <Link to="/contact">Contact Us</Link>
//                 }
//               </li>
//           </ul>
//       </div>
//   </div>
// </nav>
