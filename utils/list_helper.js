const palindrom = (string) => {
  return string.split('').reverse().join('')
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>{
  const likes= blogs.map(blog => blog.likes)
  const sum =(total, num)=>(
    total + num
  )
  return likes.reduce(sum)
}

module.exports = {
  palindrom,
  average,
  dummy,
  totalLikes
}