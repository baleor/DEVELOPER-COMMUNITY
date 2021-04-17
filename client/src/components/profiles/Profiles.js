import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/spinner';
import Profileitem from './Profileitem';
import {getProfiles} from '../../actions/profile'

const Profiles = ({profile: {profiles , loading}, getProfiles }) => {

    useEffect( () =>{
        getProfiles();
    },[getProfiles]);

    return (
        <Fragment>
            { loading ? <Spinner/> : 
            <Fragment>
                <h1 className="large text-primary">Profiles</h1>
                <p className="lead">
                    <i className=" fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? 
                    (profiles.map(
                        profile => (
                            <Profileitem key={profile._id} profile={profile}/>
                        ) 
                    )) 
                    : <Fragment></Fragment> }
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    profile : PropTypes.object.isRequired,
    getProfiles : PropTypes.func.isRequired
}

const mapStateTOProps = state => ({
    profile : state.profile
})

export default connect(mapStateTOProps, {getProfiles})(Profiles)
