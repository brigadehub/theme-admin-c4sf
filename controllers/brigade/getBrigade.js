const npmSearch = require('npm-module-search')

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
  npmSearch.search('brigadehub-admin', {limit: 100}, function (err, adminModules) {
    console.log('Here are 100 adminModules', adminModules)
    npmSearch.search('brigadehub-public', {limit: 100}, function (err, publicModules) {
      console.log('Here are 100 publicModules', publicModules)
      res.render(res.theme.public +'/views/brigade', {
        view: 'brigade-manage',
        title: 'Brigade',
        brigade: res.locals.brigade,
        publicModules,
        adminModules
      })
    })
  })
}
