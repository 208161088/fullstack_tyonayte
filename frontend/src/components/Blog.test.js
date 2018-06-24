import React from 'react'
import { shallow } from 'enzyme'
import { mount } from 'enzyme'
import App from '../App'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'
jest.mock('../services/blogs')

describe('<Blog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'testauthor',
      likes: 5

    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleAuthorDiv = blogComponent.find('.ta')
    const likesDiv = blogComponent.find('.l')
    expect(titleAuthorDiv.text()).toContain(blog.title)
    expect(titleAuthorDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })
})

