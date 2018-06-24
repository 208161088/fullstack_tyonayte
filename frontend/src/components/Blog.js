import React from 'react'
import {Link} from 'react-router-dom'
const Blog = ({blog}) => (
  <div>
    <Link to={'/blogs/'+blog._id}>
      {blog.title} {blog.author}
    </Link>
  </div>  
)

export default Blog