const markdown = require('markdown-it')
const mdnh = require('markdown-it-named-headers')
const md = markdown({ html: true }).use(mdnh)
const _ = require('lodash')
const moment = require('moment')
const slugify = require('slugify')

module.exports = {
  method: 'get',
  endpoint: '/blog/new',
  authenticated: true,
  roles: ['core', 'superAdmin', 'coreLead', 'blog', 'lead'],
  middleware: [],
  controller: getBlogNew
}

function getBlogNew (req, res) {
  const Post = req.models.Posts
  const User = req.models.Users
  let uniqueId = ''
  for (let i = 0; i < 10; i++) {
    uniqueId += Math.floor(Math.random() * 10)
  }
  User.find({}, function (err, users) {
    if (err) console.error(err)
    res.render(res.theme.public + '/views/blog/new-edit', {
      view: 'blog-post-new',
      title: 'New Blog',
      brigade: res.locals.brigade,
      user: res.locals.user,
      users: users,
      plaintextcontent: req.session.blogpostplaintextcontent,
      uniqueId: uniqueId
    })
  })
}
