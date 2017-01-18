/**
 *  Dependencies
 */

/**
 *  Exports
 */

module.exports = {
  method: 'get',
  endpoint: '/users/:userId/settings',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: getUsersIDSettings
}

/**
 *  Controller
 */

function getUsersIDSettings (req, res) {
  res.render(res.theme.admin + '/views/users/settings', {
    view: 'user-settings',
    userId: req.params.userId,
    title: 'IDSettings Users',
    brigade: res.locals.brigade
  })
}
