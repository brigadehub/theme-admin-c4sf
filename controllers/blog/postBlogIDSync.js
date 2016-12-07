module.exports = {
  method: 'post',
  endpoint: '/blog/:blogId/sync',
  authenticated: true,
  roles: ['core', 'superAdmin', 'coreLead', 'blog', 'lead'],
  middleware: [],
  controller: postBlogIDSync
}

function postBlogIDSync (req, res) {

}
