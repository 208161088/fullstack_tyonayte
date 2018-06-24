import React from 'react'
const OneBlog = ({ blog }) => (
  <div>
    <h1>{blog.title} {blog.author}</h1>
    <a href={blog.url}>{blog.url}</a><div />
    added by {blog.user.name}
  </div>
)
export default OneBlog