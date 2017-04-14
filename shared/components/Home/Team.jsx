import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Team (props, context) {
  return (
    <section id="speakers">
		<h3>The Dream Team</h3>
		<div className="separator"></div>
		<div className="container">
			<div className="col-md-8 col-md-offset-2">

				<p>Here is our team of dedicated directors</p>
			</div>


			<div className="row1">


				<div className="col-md-3">
					<div className="member-profile">
            <div className="unhover_img">
              <img src="/img/maxProfile.jpg" alt="" />
            </div>
						<span><div className="row team__directors_description--title">Creative Director</div><div className="row">Artiste</div></span>
						<h4><span>Max </span> Bryan</h4>
					</div>
					<ul>
						<li><a href="mailto:maxnorthbryan@gmail.com" target="_blank"><i className="fa fa-envelope"></i></a></li>
					</ul>
				</div>


				<div className="col-md-3">
					<div className="member-profile">
            <div className="unhover_img">
              <img src="/img/chrisProfile.jpg" alt="" />
            </div>
						<span><div className="row team__directors_description--title">Founding Director</div><div className="row">Web Developer</div></span>
						<h4><span>Christian</span> Hamelin</h4>
					</div>
					<ul>
						<li><a href="mailto:chrislhamelin@gmail.com" target="_blank"><i className="fa fa-envelope"></i></a></li>
					</ul>
				</div>


				<div className="col-md-3">
					<div className="member-profile">
            <div className="unhover_img">
              <img src="/img/simonProfile.jpg" alt="" />
            </div>
						<span><div className="row team__directors_description--title">Founding Director</div><div className="row">BA from Uvic</div></span>
						<h4><span>Simon</span> Harms</h4>
					</div>
					<ul>
						<li><a href="mailto:simonharms92@gmail.com" target="_blank"><i className="fa fa-envelope"></i></a></li>
					</ul>
				</div>


				<div className="col-md-3">
					<div className="member-profile">
						<div className="unhover_img">
				      <img src="/img/gavProfile.jpg" alt="" />
						</div>
						<span><div className="row team__directors_description--title">Founding Director</div><div className="row">BComm from Uvic</div></span>
						<h4><span>Gavin</span> Harms</h4>
					</div>
					<ul>
						<li><a href="mailto:gharms92@gmail.com" target="_blank"><i className="fa fa-envelope"></i></a></li>
					</ul>
				</div>

			</div>
			<div className="clear"></div>

		</div>
	</section>
  );
}

export default Team;
