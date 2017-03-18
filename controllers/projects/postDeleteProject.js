module.exports = {
  method: 'post',
  endpoint: '/projects/:projectId/delete',
  authenticated: true,
  roles: ['lead', 'core', 'superAdmin'],
  scopes: ['user:email', 'repo'],
  middleware: [],
  controller: postDeleteProject
}

function postDeleteProject (req, res) {
  var Projects = req.models.Projects
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
