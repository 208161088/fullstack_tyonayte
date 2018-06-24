import React from 'react'
import Menu from './components/Menu'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import OneBlog from './components/OneBlog'
import OneUser from './components/OneUser'
import Togglable from './components/Togglable'
import Comments from './components/Comments'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
class App extends React.Component {
  /*
  static propTypes = {
    children: PropTypes.node
  }
*/
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      users: [],
      showAll: true,
      error: null,
      username: '',
      password: '',
      user: null,
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      newComment: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    userService().then(users =>
      this.setState({ users }),
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    this.setState({ username: '', password: '', user: null })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogUrl
    }
    const newBlog = await blogService.create(blogObject)
    const users = await userService()
    this.setState({
      blogs: this.state.blogs.concat(newBlog),
      users,
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: ''
    })
  }

  addComment = async (blogId, event) => {
    event.preventDefault()
    const commentObject = {
      comment: this.state.newComment,
      id: blogId
    }
    const modifiedBlog = await blogService.createComment(commentObject)
    const index = this.state.blogs.indexOf(this.state.blogs.find(a => a._id === blogId))
    const newBlogState = this.state.blogs
    newBlogState.splice(index, 1, modifiedBlog)
    this.setState({
      blogs: newBlogState,
      newComment: ''
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  userById = (id) => {
    const users = this.state.users
    if (users.length > 0) {
      this.state.users.find(a => a._id === id)
    }
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleChange}
            handleSubmit={this.login}
          />
        </div>
      )
    }
    return (
      <div>
        <Router>
          <div>
            <h1>blog app</h1>
            <Menu /><p>{this.state.user.name} logged in <button onClick={this.logout}> logout </button></p>
            <Togglable buttonLabel="new blog">
              <BlogForm
                onSubmit={this.addBlog}
                value1={this.state.newBlogTitle}
                value2={this.state.newBlogAuthor}
                value3={this.state.newBlogUrl}
                handleChange={this.handleChange}
              />
            </Togglable>
            <Route exact path="/" render={() =>
              <BlogList blogs={this.state.blogs} />
            } />
            <Route exact path="/users" render={() =>
              <UserList users={this.state.users} />
            } />
            <Route path="/users/:id" render={({ match }) => {
              const users = this.state.users
              if (users.length > 0) {
                return (
                  <div>
                    <OneUser user={this.state.users.find(a => a._id === match.params.id)} />
                  </div>
                )
              }
              return null
            }
            } />
            <Route path="/blogs/:id" render={({ match }) => {
              const blogs = this.state.blogs
              const blog = blogs.find(a => a._id === match.params.id)
              if (blogs.length > 0) {
                return (
                  <div>
                    <OneBlog blog={blog} />
                    <Comments handleSubmit={(e)=>this.addComment(blog._id, e)} handleChange={this.handleChange} blogId={blog._id} comments={blog.comments} comment={this.state.newComment}/>
                  </div>
                )
              }
              return null
            }
            } />
          </div>
        </Router>
      </div>
    )
  }
}

export default App