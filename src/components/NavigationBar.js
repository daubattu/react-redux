import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NavigationBar extends Component {
  render() {
    return(
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">Brand</a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="active"><a href="/">Link <span className="sr-only">(current)</span></a></li>
            <li><a href="/">Link</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to={'signup'}>Sign up</Link></li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}
