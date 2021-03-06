import axios from 'axios';
import { setAlert } from './alert'
import { 
    ADD_COMMENT,
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    REMOVE_COMMENT
} from "./types";

export const getPosts = () => async dispatch => {

    try {
        const res = await axios.get('/post')

        dispatch({
            type : GET_POSTS,
            payload : res.data
        })

    } catch (err) {
        dispatch({
            type : POST_ERROR,
            payload : {msg : err.response}
        })
    }
}

export const getPost = postId => async dispatch => {

    try {
        const res = await axios.get(`/post/${postId}`)

        dispatch({
            type : GET_POST,
            payload : res.data
        })

    } catch (err) {
        dispatch({
            type : POST_ERROR,
            payload : {msg : err.response}
        })
    }
}

export const addLike = postId => async dispatch => {

    try {
        const res = await axios.put(`/post/like/${postId}`)

        dispatch({
            type : UPDATE_LIKES,
            payload : {postId, likes: res.data }
        })

    } catch (err) {

        const errors = err.response.data.error;
        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type : POST_ERROR,
            payload : {msg : err.response}
        })
    }
}

export const removeLike = postId => async dispatch => {

    try {
        const res = await axios.put(`/post/unlike/${postId}`)

        dispatch({
            type : UPDATE_LIKES,
            payload : {postId, likes: res.data }
        })

    } catch (err) {

        const errors = err.response.data.error;
        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type : POST_ERROR,
            payload : {msg : err.response}
        })
    }
}

export const deletePost = postId => async dispatch => {

    try {
        await axios.delete(`/post/${postId}`)

        dispatch({
            type : DELETE_POST,
            payload : postId
        })

        getPosts();

        dispatch(setAlert('Post Deleted','danger'))

    } catch (err) {

        const errors = err.response.data.error;
        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type : POST_ERROR,
            payload : {msg : err.response}
        })
    }
}

export const addPost = formData => async dispatch => {

    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/post`, formData, config)

        dispatch({
            type : ADD_POST,
            payload : res.data
        })
        dispatch(setAlert('Post added','Success'))

    } catch (err) {

        dispatch({
            type : POST_ERROR,
            payload : {msg : err.response}
        })
    }
}

export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/post/comment/${postId}`, formData, config)

        dispatch({
            type : ADD_COMMENT,
            payload : res.data
        })
        dispatch(setAlert('Comment added','Success'))

    } catch (err) {

        dispatch({
            type : POST_ERROR,
            payload : {msg : err.response}
        })
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        await axios.delete(`/post/comment/${postId}/${commentId}`)

        dispatch({
            type : REMOVE_COMMENT,
            payload : commentId
        })
        dispatch(setAlert('Comment removed','success'))

    } catch (err) {

        dispatch({
            type : POST_ERROR,
            payload : {msg : err.response}
        })
    }
}