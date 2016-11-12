/**
 *  Exports
 */

module.exports = {
  method: 'get',
  endpoint: '/brigade',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: getBrigade
}

/**
 *  Controller
 */
function getBrigade (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/brigade', {
    view: 'brigade-manage',
    title: 'Brigade',
    brigade: res.locals.brigade
  })
}
