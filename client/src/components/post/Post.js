import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/spinner';
import PostItem from '../posts/PostItem';
import {getPost} from '../../actions/post'
import { Link } from 'react-router-dom';
import Commentform from './Commentform'
import Commentitem from './Commentitem'


const Post = ({getPost, post : {post, loading}, match}) => {

    useEffect( () => {
        getPost(match.params.id)
    },[getPost, match.params.id])
    
    return loading || post === null ? <Spinner /> : 
    <Fragment>
        <Link to='/posts' className='btn'>Back To Posts</Link>
        <PostItem post={post} showButton={false} />
        <Commentform postId={post._id} />
        <div className="comments">
            <h1>Comments</h1>
            {post.comments.map( comment => (
                <Commentitem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment>
}

Post.propTypes = {
    getPost : PropTypes.func.isRequired,
    post : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post : state.post
});

export default connect(mapStateToProps,{ getPost })(Post)
