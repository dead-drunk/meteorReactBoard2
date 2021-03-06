import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import handleLogout from "../../modules/common/handleLogout.js";

const renderlogin = ({ hasUser, history }) => {
  if (hasUser) {
    return (
      <ul className="nav navbar-nav home_nav_user">
        <li>
          <Link to="/dashboard" className="fa fa-home" />
        </li>
        <li>
          <a
            href="#"
            className="logout fa fa-sign-out"
            onClick={() => handleLogout(history)}
          />
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="nav navbar-nav home_nav_user">
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
  }
};

const renderGettingStart = ({ hasUser }) => {
  if (!hasUser) {
    return (
      <Link
        type="button"
        className="btn btn-default btn-lg center"
        to="/signup"
      >
        Getting start now
      </Link>
    );
  }
};

class Home extends React.Component {
  componentDidMount() {}

  render() {
    //const data  = this.props;
    console.log("this.props", this.props);
    //console.log('data', data);
    return (
      <div className="home_wrapper">
        <nav
          className="navbar navbar-default home_navbar_main"
          role="navigation"
        >
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#home_nav"
              >
                <span className="sr-only">Toggle Navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a href="#" className="navbar-brand">
                <div className="logo material-icons">casino</div>
                <span>The Board</span>
              </a>
            </div>

            <div id="home_nav" className="collapse navbar-collapse home_nav">
              <ul className="nav navbar-nav home_nav_navbar">
                <li className="active">
                  <a href="#">Tour</a>
                </li>
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">How it works</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
              {/* main-navbar-nav */}

              {renderlogin(this.props)}
            </div>
            {/* navbar-collapse */}
          </div>
          {/* container */}
        </nav>

        <div className="home_tour">
          <div className="container">
            <div className="center home_tour_header">
              <h1>Let's work together visually</h1>

              <p className="lead">
                Visual online collaboration for remote teams
              </p>

              {renderGettingStart(this.props)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
