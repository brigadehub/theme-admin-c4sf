/**
 *  Dependencies
 */

 var markdown = require('markdown-it')
 var mdnh = require('markdown-it-named-headers')
 var md = markdown({ html: true }).use(mdnh)
 var _ = require('lodash')
 var moment = require('moment')
 var slugify = require('slugify')

/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/blog/manage',
  authenticated: true,
  roles: ['core', 'superAdmin', 'coreLead', 'blog', 'lead'],
  middleware: [],
  controller: postBlogManage
}

/**
 *  Controller
 */

function postBlogManage (req, res) {
    // var Post = req.models.Posts
    // var User = req.models.Users
    // req.flash('success', { msg: 'Success! Posts edited' })
    // var mongooseQuery = {}
    // if (!res.locals.user.isAdmin()) {
    //   mongooseQuery.author = res.locals.user.username
    // }
    // Post.find(mongooseQuery, function (err, posts) {
    //   if (err) console.error(err)
    //   posts.reverse() // so that most recent are first
    //   posts.forEach(function (post) {
    //     var postInfo = req.body[post.id]
    //     if (postInfo.delete) {
    //       post.remove()
    //       return
    //     }
    //     post.title = postInfo.title
    //     post.published = !!postInfo.published
    //     post.author = postInfo.author
    //     post.date = postInfo.date
    //     post.save(function (err) {
    //       if (err) throw err
    //     })
    //   })
    // })
    // return res.redirect('/blog/manage/')
  }
