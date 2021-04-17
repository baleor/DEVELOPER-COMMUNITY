import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Spinner from '../layouts/spinner';
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getCurrentProfile} from '../../actions/profile'
import {deleteAccount} from '../../actions/profile'



const Dashboard = ({ getCurrentProfile, auth: {User}, profile: {profile, loading}, deleteAccount}) => {

    useEffect( () => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && profile === null ? <Spinner/> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"/> Welcome {User && User.User.name}
        </p>
        {profile !== null ? (<Fragment>
            <DashboardActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <button onClick={() => deleteAccount()} className='btn btn-danger'>Delete Account</button>
            </Fragment>) : 
        (<Fragment>
            <p>You Have not setup a profile, please add some info</p>
            <Link to='/createProfile' className="btn btn-primary my-1">
                Create Profile
            </Link>
            </Fragment>) }
    </Fragment>;
}

Dashboard.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth : state.auth,
    profile : state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
