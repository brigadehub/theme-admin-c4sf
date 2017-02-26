const markdown = require('markdown-it')
const mdnh = require('markdown-it-named-headers')
const md = markdown({ html: true }).use(mdnh)
const _ = require('lodash')
const moment = require('moment')
const slugify = require('slugify')

module.exports = {
  method: 'post',
  endpoint: '/blog/new',
  authenticated: true,
  roles: ['core', 'superAdmin', 'coreLead', 'blog', 'lead'],
  middleware: [],
  controller: postBlogNew
}

function postBlogNew (req, res) {
  const Post = req.models.Posts
  const User = req.models.Users
  let blogpost = {
    slug: slugify(req.body.title),
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    description: req.body.description,
    content: req.body.content,
    date: moment(req.body.date, 'MM/DD/YYYY').toDate(),
    published: req.body.published
  }
  if (req.body.url) blogpost.url = req.body.url
  if (req.body.tags) blogpost.tags = req.body.tags
  if (typeof blogpost.tags === 'string') {
    blogpost.tags = [blogpost.tags]
  }
  if (blogpost.tags && blogpost.tags.length) blogpost.tags = blogpost.tags.map((tag) => tag.trim())
  blogpost = new Post(blogpost)

  blogpost.save(function (err) {
    if (err) {
      req.session.blogpostplaintextcontent = req.body.content
      req.flash('errors', { msg: err.message })
      return res.redirect(req.session.returnTo || '/admin/blog/new')
    } else {
      req.session.blogpostplaintextcontent = null
      if (req.body.published === 'true') {
        req.flash('success', { msg: 'Success! Blog post created.' })
      } else {
        req.flash('success', { msg: 'Success! Blog post saved.' })
      }
      return res.redirect('/blog/post/' + blogpost.slug)
    }
  })
}
