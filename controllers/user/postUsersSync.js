/**
 *  Dependencies
 */

/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/users/sync',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postUsersSync
}

/**
 *  Controller
 */

function postUsersSync (req, res) {
  var Users = req.models.Users
  Users.fetchGithubUsers(res.locals.brigade, req.user, function (results) {
    req.flash('success', { msg: 'Success! You have successfully synced users from Github.' })
    res.redirect('/admin/users/manage')
  })
}
