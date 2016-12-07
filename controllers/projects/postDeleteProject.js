var slug = require('slug')
var markdown = require('markdown-it')
var mdnh = require('markdown-it-named-headers')
var md = markdown({ html: true }).use(mdnh)

module.exports = {
  method: 'post',
  endpoint: '/projects/:projectId/delete',
  authenticated: true,
  roles: ['lead', 'core', 'superAdmin'],
  scopes: ['user', 'repo'],
  middleware: [],
  controller: postDeleteProject
}

function postDeleteProject (req, res) {
  var Projects = req.models.Projects
  var Users = req.models.Users
  Projects.remove({id: req.params.projectId}, function (err) {
    if (err) {
      console.error(err)
      return res.redirect('/projects/' + req.params.projectId)
    } else {
      req.flash('success', {msg: 'Your project was deleted.'})
      return res.redirect('/projects/')
    }
  })
}
