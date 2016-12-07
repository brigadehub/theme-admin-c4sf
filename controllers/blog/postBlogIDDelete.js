const markdown = require('markdown-it')
const mdnh = require('markdown-it-named-headers')
const md = markdown({ html: true }).use(mdnh)
const _ = require('lodash')
const moment = require('moment')
const slugify = require('slugify')

module.exports = {
  method: 'post',
  endpoint: '/blog/post/:blogId/delete',
  authenticated: true,
  middleware: [],
  controller: postBlogIDDelete
}

function postBlogIDDelete (req, res) {
  const Post = req.models.Posts
  const User = req.models.Users
  Post.remove({slug: req.params.blogId}, function (err) {
    if (err) {
      console.log(err)
      return res.redirect('/blog/post/' + req.params.blogId)
    } else {
      req.flash('success', {msg: 'Your post was deleted.'})
      return res.redirect('/blog/')
    }
  })
}
