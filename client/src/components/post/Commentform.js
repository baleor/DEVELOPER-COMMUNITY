import React,{Fragment, useState} from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'
import PropTypes from 'prop-types'

const Commentform = ({addComment, postId})    => {

    const [text, setText] = useState('')
   
    return (
        <Fragment>
        <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave a Comment</h3>
        </div>
        <form class="form my-1" onSubmit={e => {
            e.preventDefault();
            addComment(postId, { text });
            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a comment"
            value={text}
            onChange={ e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
        </Fragment>
    )
    
    }
    
Commentform.propTypes = {
    addComment : PropTypes.func.isRequired
}


export default connect(null, {addComment})(Commentform)
