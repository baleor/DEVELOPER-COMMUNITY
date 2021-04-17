import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile : {
    status,
    company,
    location,
    website,
    social,
    bio,
    skills,
    experience,
    education,
    user: {name, avatar}
}}) => {
    return (
        <div>
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src={avatar}
            alt=""
          />
          <h1 class="large">{name}</h1>
          <p class="lead">{status} {company && <span> at {company}</span>}</p>
          <p>{location && <span>{location}</span>}</p>
          <div class="icons my-1">
            { website && (
                <a href={website} target="_blank" rel="noopener noreferrer">
                <i class="fas fa-globe fa-2x"></i>
              </a>
            )}
            {social && social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter fa-2x"></i>
              </a>
            )}
            {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook fa-2x"></i>
              </a>
            )}
            {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin fa-2x"></i>
              </a>
            )}
            {social && social.youtube && (
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i class="fab fa-youtube fa-2x"></i>
              </a>
            )}
            <a href={social.instagram} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>


        <div class="profile-about bg-light p-2">
          <h2 class="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            {skills.map((skill, index) => 
                <div key={index} className="p-1">
                    <i className='fas fa-check'/> {skill}
                </div>
            )}
          </div>
        </div>

        <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          {experience.length > 0 ? (<Fragment>
            {experience.map( exp => (
                <div>
                <h3 class="text-dark">{exp.company}</h3>
                <p>Status:{exp.status === 1 ? (<p>Active</p>) : (<p>Left</p>)}</p>
                <p><strong>Position: </strong>{exp.title}</p>
                <p>
                  <strong>Description: </strong>
                  {exp.description}
                </p>
              </div>
            ))}
          </Fragment>) 
          : (<h4> No experience </h4>)}
        </div>

        <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          {education.length > 0 ? (
              (<Fragment>
                  {education.map( edu => (
                      <div>
                      <h3>{edu.school}</h3>
                      <p>Pending : {edu.current === 1 ? (<p>Active</p>) : (<p>Done</p>)}</p>
                      <p><strong>Degree: </strong>{edu.degree}</p>
                      <p><strong>Field Of Study: </strong>{edu.feildofstudy}</p>
                      <p>
                        <strong>Description: </strong>
                        {edu.description}
                      </p>
                    </div>
                  ))}
              </Fragment>)
          ) : (<h4>No Education</h4>)}
        </div>
    </div>
        
    )
}

ProfileTop.propTypes = {
    profile : PropTypes.object.isRequired
}

export default ProfileTop
