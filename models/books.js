module.exports = app => {
  return {
    findAll: (params, callback) => {
      return callback([
        {
          title: 'An astronaut\'s guide to life on earth',
          author: 'Col. Chris Hadfield'
        },
        {
          title: 'Cat\'s cradle',
          author: 'Kurt Vonnegut'
        }
      ])
    }
  }
}
