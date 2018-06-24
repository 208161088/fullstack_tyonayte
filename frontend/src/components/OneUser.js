import React from 'react'
const OneUser = ({ user }) => (
  <div>
    <h1>{user.name}</h1>
    <h2>Added blogs</h2>
    <ul>
      {user.blogs.map(blog =>
        <li key={blog._id}>{blog.title}</li>
      )}
    </ul>
  </div>
)
export default OneUser