import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
        <Link to='/' className='navbar-brand'><h1>Blog 📝</h1></Link>
        <div className='' id='navbarSupportedContent'>
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/articles/" className="nav-link">All Articles</Link>
            </li>
            <li className="navbar-item">
              <Link to="/articles/add" className="nav-link">Add Article</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}