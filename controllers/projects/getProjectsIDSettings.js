var slug = require('slug')
var markdown = require('markdown-it')
var mdnh = require('markdown-it-named-headers')
var md = markdown({ html: true }).use(mdnh)

module.exports = {
  method: 'get',
  endpoint: '/projects/:projectId/settings',
  authenticated: true,
  roles: ['lead', 'core', 'superAdmin'],
  scopes: ['user:email', 'repo'],
  middleware: [],
  controller: getProjectsIDSettings
}

function getProjectsIDSettings (req, res) {
  var Projects = req.models.Projects
  var Users = req.models.Users
  Projects.find({'id': req.params.projectId}, function (err, foundProject) {
    if (err) console.error(err)
    foundProject.repositories = foundProject.repositories || []
    Users.find({}, function (err, allUsers) {
      if (err) console.error(err)
      res.render(res.theme.admin + '/views/projects/settings', {
        view: 'project-settings',
        project: foundProject[0],
        users: allUsers,
        title: 'IDSettings Projects',
        brigade: res.locals.brigade
      })
    })
  })
}
