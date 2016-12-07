var slug = require('slug')
var markdown = require('markdown-it')
var mdnh = require('markdown-it-named-headers')
var md = markdown({ html: true }).use(mdnh)

module.exports = {
  method: 'post',
  endpoint: '/projects/manage',
  authenticated: true,
  roles: ['lead', 'core', 'superAdmin'],
  scopes: ['user', 'repo'],
  middleware: [],
  controller: postProjectsManage
}

function postProjectsManage (req, res) {
  var Projects = req.models.Projects
  var Users = req.models.Users
  var mongooseQuery = {}
  //  if (!res.locals.user.isAdmin()) {
  //   //  mongooseQuery.author = res.locals.user.username
  //  }
  Projects.find(mongooseQuery, function (err, projects) {
    if (err) console.error(err)
    projects.reverse() // so that most recent are first
    projects.forEach(function (project) {
      var projectInfo = req.body[project.id]
      if (projectInfo.delete) {
        project.remove()
        return
      }
      project.name = projectInfo.name
      project.published = !!projectInfo.published
      project.active = !!projectInfo.active
      project.save(function (err) {
        if (err) {
          console.error(err)
          req.flash('errors', {msg: 'An Error occured while saving your projects.'})
          return res.redirect('/projects/manage')
        }
        req.flash('success', { msg: 'Success! Projects edited.' })
        return res.redirect('/projects/manage/')
      })
    })
  })
}
