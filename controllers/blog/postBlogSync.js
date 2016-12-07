module.exports = {
  method: 'post',
  endpoint: '/blog/sync/:type',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  middleware: [],
  controller: postBlogSync
}

function postBlogSync (req, res) {

}
