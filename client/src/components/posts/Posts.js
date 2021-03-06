import React,{Fragment, useEffect} from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import PostItem from './PostItem';
import Spinner from '../layouts/spinner';
import PropTypes from 'prop-types'
import Postform from './Postform'

const Posts = ({getPosts, post : {posts, loading}})    => {

    useEffect( () => {
        getPosts();
    },[getPosts]);
    
    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
            <i className="fas fa-user"></i> Welcome To The Community
            </p>
            <Postform />
            <div className="posts">
                {posts.map( post => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts : PropTypes.func.isRequired,
    post : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post : state.post,

})

export default connect(mapStateToProps, {getPosts})(Posts)
