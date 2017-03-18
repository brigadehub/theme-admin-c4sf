
module.exports = {
  method: 'post',
  endpoint: '/blog/post/:blogId/delete',
  authenticated: true,
  middleware: [],
  controller: postBlogIDDelete
}

function postBlogIDDelete (req, res) {
  const Post = req.models.Posts
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
