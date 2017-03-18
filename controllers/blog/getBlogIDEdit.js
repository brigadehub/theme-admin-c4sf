const moment = require('moment')

module.exports = {
  method: 'get',
  endpoint: '/blog/post/:blogId/edit',
  authenticated: true,
  roles: ['core', 'superAdmin', 'coreLead', 'blog', 'lead'],
  middleware: [],
  controller: getBlogIDEdit
}

function getBlogIDEdit (req, res) {
  const Post = req.models.Posts
  const User = req.models.Users
  Post.find({slug: req.params.blogId}, function (err, post) {
    if (err) throw err
    post = post[0]
    console.log(post.date)
    post = post.toJSON()
    post.date = moment(post.date).format('MM/DD/YYYY')
    console.log(post.date, moment(post.date).format('MM/DD/YYYY'))
    User.find({}, function (err, users) {
      if (err) console.log(err)
      res.render(res.theme.admin + '/views/blog/new-edit', {
        view: 'blog-post-edit',
        blogId: req.params.blogId,
        title: 'Edit Blog Post',
        brigade: res.locals.brigade,
        user: res.locals.user,
        post: post,
        users: users
      })
    })
  })
}
