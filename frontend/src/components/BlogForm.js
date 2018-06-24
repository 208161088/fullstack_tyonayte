import React from 'react'
const BlogForm = ({ onSubmit, handleChange, value1, value2, value3}) => {
    return (
      <div>
        <h3>create new</h3>
  
        <form onSubmit={onSubmit}>
          <div>
            title
            <input
              name="newBlogTitle"
              value={value1}
              onChange={handleChange}
            />
          </div>
          <div>
            author
            <input
              name="newBlogAuthor"
              value={value2}
              onChange={handleChange}
            />
          </div>
          <div>
            url
            <input
              name="newBlogUrl"
              value={value3}
              onChange={handleChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
export default BlogForm