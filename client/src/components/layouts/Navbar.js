import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'
// import { profile_url } from 'gravatar';

var Navbar = ({logout , auth : {isAuthenticated, loading}}) => {

  const authLinks = (
    <ul>
      <li>
      <i className='fas fa-user'/>{' '}
      
        <Link to="/dashboard">
        <span className='hide-sm'>Dashboard</span>
          </Link></li>
      <li><Link to="/posts">Posts</Link></li>
      <li><Link to="/profiles">Profiles</Link></li>
      <li>
        <a  onClick={logout} href='/'>
        <i className='fas fa-sign-out-alt'/>{' '}
        <span className='hide-sm'>Logout</span>
        </a>
      </li>
      </ul>
  );

  const guestLinks = (
    <ul>
        <li><Link to="/profiles">Profiles</Link></li>
        <li><Link to="/Register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  );


    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
            <i className="fas fa-code"></i> Devcommmunity
        </Link>
      </h1>
      { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </nav>
    )
}

Navbar.propTypes = {
  logout : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth : state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);