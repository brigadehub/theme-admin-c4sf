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
  npmSearch.search('brigadehub-admin', { limit: 100 }, function (err, adminModules) {
    if (err) console.error(err)
    npmSearch.search('brigadehub-public', { limit: 100 }, function (err, publicModules) {
      if (err) console.error(err)
      const brigadeModel = res.locals.brigade
      for (let i = 0, len = brigadeModel.sponsors.length; i < len; i++) {
        if (brigadeModel.sponsors[i].main === true) {
          brigadeModel.ContainsMainSponsor = true
        } else {
          brigadeModel.ContainsMainSponsor = false
        }
      }

      res.render(res.theme.admin + '/views/brigade', {
        view: 'brigade-manage',
        title: 'Brigade',
        brigade: brigadeModel,
        publicModules,
        adminModules
      })
    })
  })
}
