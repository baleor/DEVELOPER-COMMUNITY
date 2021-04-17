import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layouts/spinner';
import ProfileTop from './ProfileTop'
// import ProfileAbout from './ProfileAbout'
import { connect } from 'react-redux'
import { getProfileById} from '../../actions/profile'
import { Link } from 'react-router-dom';

const Profile = ({getProfileById, profile : {profile, loading}, auth, match}) => {

    useEffect( () => {
        getProfileById(match.params.id)
    },[getProfileById, match.params.id])
    return (
        <Fragment>
            {profile === null ? (<div>
                <h1>No Profile</h1>
                <Spinner/>
            </div>) : 
            <Fragment>
                <Link to='/profiles' className='btn btn-dark'>Profiles</Link>
                {auth.isAuthenticated && (<Link to='/posts' className='btn btn-dark'>Posts</Link>)}
                {auth.isAuthenticated && loading === false && auth.User.User._id === profile.user._id && 
                (<Link to="/editprofile" class="btn btn-dark">Edit Profile</Link>)}
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                    {/* <ProfileAbout profile={profile}/> */}
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile : state.profile,
    auth : state.auth
})

export default connect(mapStateToProps, {getProfileById})(Profile)
