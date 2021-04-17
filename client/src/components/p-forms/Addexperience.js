import React, {Fragment, useState} from 'react'
import { Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addExperience} from '../../actions/profile' 

const Addexperience = ({addExperience, history}) => {

    const [formData, setFormData] = useState({
        title:'',
        company:'',
        location:'',
        from:'',
        status:false,
        description:''
    })

    let {
        title,
        company,
        location,
        from,
        status,
        description
    }= formData

    const onChange = e => setFormData({...formData,[e.target.name] : e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData,history);
    }
    return (
        <Fragment>
            <h1 class="large text-primary">
       Add An Experience
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={ e => onSubmit(e)}>
        <div class="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={ e => onChange(e)} required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={ e => onChange(e)} required />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={ e => onChange(e)}/>
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={ e => onChange(e)}/>
        </div>
         <div class="form-group">
          <p><input type="checkbox" name="status" value={status} onChange={ status = !status } /> Current Status</p>
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} 
            onChange={ e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

Addexperience.propTypes = {
    addExperience : PropTypes.func.isRequired
}

export default connect(null,{addExperience })(Addexperience)
