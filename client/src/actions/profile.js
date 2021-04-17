import axios from 'axios';
import { setAlert } from './alert'
import { 
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILES
} from "./types";

export const getCurrentProfile = () => async dispatch => {
    try {
        const res =  await axios.get('http://localhost:5000/profile/me');

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
    } catch (err) {
        
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response}
        })
    }
}

export const getProfiles = () => async dispatch => {
    try {
        const res =  await axios.get('http://localhost:5000/profile');

        dispatch({
            type : GET_PROFILES,
            payload : res.data
        })
    } catch (err) {
        
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response}
        })
    }
}

export const getProfileById = userId => async dispatch => {
    try {
        const res =  await axios.get(`http://localhost:5000/profile/user/${userId}`);

        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })
    } catch (err) {
        
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response}
        })
    }
}

export const createProfile = (formData, history,edit = false) => async dispatch => {

    try {
        
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        console.log('run');
        const res = await axios.post('http://localhost:5000/profile', formData, config)
        console.log('ning');
        dispatch({
            type : GET_PROFILE,
            payload : res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated ' : 'Profile Saved','Success'))

        if(!edit){
            history.push('/dashboard')
        }

    } catch (err) {

        const errors = err.response.data.error;
        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg,'danger')));
        }

        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response}
        })
        
    }
    
}

export const addExperience = (formData,history,edit = false) => async dispatch =>{
    try {
        
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('http://localhost:5000/profile/experience', formData, config)

        dispatch({
            type : UPDATE_PROFILE,
            payload : res.data
        })

        dispatch(setAlert('Experience Updated','Success'))

        if(!edit){
            history.push('/dashboard')
        }

    } catch (err) {

        const errors = err.response.data.error;
        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg,'danger')));
        }

        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText}
        })
        
    }
    
}


export const addEducation = (formData,history,edit = false) => async dispatch =>{
    try {
        
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('http://localhost:5000/profile/education', formData, config)

        dispatch({
            type : UPDATE_PROFILE,
            payload : res.data
        })

        dispatch(setAlert('Education Updated','Success'))

        if(!edit){
            history.push('/dashboard')
        }

    } catch (err) {

        const errors = err.response.data.error;
        if(errors){
            errors.forEach( error => dispatch(setAlert(error.msg,'danger')));
        }

        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText}
        })
        
    }
}

export const deleteExperience = id => async dispatch => {

    try {

        const res = await axios.delete(`http://localhost:5000/profile/experience/${id}`)

        dispatch({
            type : UPDATE_PROFILE,
            payload : res.data
        })

        dispatch(setAlert('Experience Removed','Success'))

    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText}
        })
    }
}

export const deleteEducation = id => async dispatch => {

    try {

        const res = await axios.delete(`http://localhost:5000/profile/education/${id}`)

        dispatch({
            type : UPDATE_PROFILE,
            payload : res.data
        })

        dispatch(setAlert('Education Removed','Success'))

    } catch (err) {
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg : err.response.statusText}
        })
    }
}

export const deleteAccount = () => async dispatch => {
       
        try {
            
            await axios.delete(`http://localhost:5000/profile`)
            dispatch({
                type : CLEAR_PROFILE
            })
            dispatch({
                type : DELETE_ACCOUNT
            })

            dispatch(setAlert('Account Has Been Deleted'))
    
        } catch (err) {
            dispatch({
                type : PROFILE_ERROR,
                payload : {msg : err.response.statusText}
            })
        }
}