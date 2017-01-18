var slug = require('slug')
var markdown = require('markdown-it')
var mdnh = require('markdown-it-named-headers')
var md = markdown({ html: true }).use(mdnh)

module.exports = {
  method: 'post',
  endpoint: '/projects/sync',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postProjectsSync
}

function postProjectsSync (req, res) {
  var Projects = req.models.Projects
  var Users = req.models.Users

  Projects.fetchGithubRepos(res.locals.brigade, req.user, function (results) {
    req.flash('success', { msg: 'Success! You have successfully synced projects from Github.' })
    res.redirect('/projects/manage')
  })
}
