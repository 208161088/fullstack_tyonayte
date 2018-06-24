import React from 'react'
const Comments = ({ handleSubmit, handleChange, blogId, comments, comment }) => {
  return (
    <div>
      <h2>comments</h2>
      <ul>
        {comments.map((comment, index)=>
          <li key={index}>{comment}</li>
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="newComment"
            value={comment}
            onChange={handleChange}
          />
          <button type="submit">add comment</button>
        </div>
      </form>
    </div>
  )
}
  
export default Comments