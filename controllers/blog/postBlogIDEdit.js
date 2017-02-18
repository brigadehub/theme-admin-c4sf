const markdown = require('markdown-it')
const mdnh = require('markdown-it-named-headers')
const md = markdown({ html: true }).use(mdnh)
const _ = require('lodash')
const moment = require('moment')
const slugify = require('slugify')

module.exports = {
  method: 'post',
  endpoint: '/blog/post/:blogId',
  authenticated: true,
  roles: ['core', 'superAdmin', 'coreLead', 'blog', 'lead'],
  middleware: [],
  controller: postBlogIDEdit
}

function postBlogIDEdit (req, res) {
  const Post = req.models.Posts
  const User = req.models.Users
  // - slug: String, // this is the slug
  // - title: String, // Display title
  // - author: String,
  // - url: String, // an external link you can use to override where to go when clicking
  // - image: String,
  // - description: String,
  // - content: String,
  // - date: String,
  // - unix: Number,
  // - tags: Array

  Post.find({slug: req.params.blogId}, function (err, post) {
    if (err) throw err
    post = post[0]
    post.title = req.body.title
    post.author = req.body.author
    post.url = req.body.url
    post.image = req.body.image
    post.description = req.body.description
    post.content = req.body.content
    post.date = moment(req.body.date, 'MM/DD/YYYY').toDate()
    post.published = req.body.published
    post.tags = req.body.tags
    if (typeof req.body.tags === 'string') {
      post.tags = [req.body.tags]
    }
    if (post.tags && post.tags.length) post.tags = post.tags.map((tag) => tag.trim())
    post.save(function (err) {
      if (err) {
        console.error(err)
        req.flash('errors', { msg: err.message })
        return res.redirect(req.session.returnTo || '/admin/blog/post/' + req.params.blogId + '/edit')
      } else {
        req.flash('success', { msg: 'Success! Blog post updated' })
        return res.redirect('/blog/post/' + post.slug)
      }
    })
  })
}
