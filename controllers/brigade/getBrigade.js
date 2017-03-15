const npmSearch = require('npm-module-search')

/**
 *  Exports
 */

module.exports = {
  method: 'get',
  endpoint: '/brigade',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: getBrigade
}

/**
 *  Controller
 */
function getBrigade (req, res) {
  npmSearch.search('brigadehub-admin', {limit: 100}, function (err, adminModules) {
    if (err) console.error(err)
    npmSearch.search('brigadehub-public', {limit: 100}, function (err, publicModules) {
      if (err) console.error(err)
      res.render(res.theme.admin + '/views/brigade', {
        view: 'brigade-manage',
        title: 'Brigade',
        brigade: res.locals.brigade,
        publicModules,
        adminModules
      })
    })
  })
}
