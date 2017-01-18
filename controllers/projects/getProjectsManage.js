var slug = require('slug')
var markdown = require('markdown-it')
var mdnh = require('markdown-it-named-headers')
var md = markdown({ html: true }).use(mdnh)

module.exports = {
  method: 'get',
  endpoint: '/projects/manage',
  authenticated: true,
  roles: ['lead', 'core', 'superAdmin'],
  scopes: ['user:email', 'repo'],
  middleware: [],
  controller: getProjectsManage
}

function getProjectsManage (req, res) {
  var Projects = req.models.Projects
  var Users = req.models.Users
  Projects.find({brigade: res.locals.brigade.slug}, function (err, foundProjects) {
    if (err) console.error(err)

    res.render(res.theme.admin + '/views/projects/manage', {
      view: 'project-list-manage',
      title: 'Manage Projects',
      brigade: res.locals.brigade,
      projects: foundProjects
    })
  })
}
