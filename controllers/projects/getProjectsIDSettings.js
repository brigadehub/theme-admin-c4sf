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
  console.log(req.user.teams)
  if (!req.user.teams.lead.includes(req.params.projectId) && !req.user.roles.superAdmin && !req.user.roles.core) {
    req.flash('errors', { msg: 'You are not authorized to view this resource.' })
    return res.redirect('/projects')
  }
  var Projects = req.models.Projects
  var Users = req.models.Users
  Projects.findOne({ 'id': req.params.projectId }, function (err, foundProject) {
    if (err) {
      req.flash('errors', { msg: `There was an error retrieving the Project.  error: ${err.message}` })
      console.error(err)
      return res.redirect('/projects')
    }
    foundProject.repositories = foundProject.repositories || []
    Users.find({}, function (err, allUsers) {
      if (err) {
        req.flash('errors', { msg: `There was an error retrieving the users for the project.  error: ${err.message}` })
        console.error(err)
        return res.redirect('/projects')
      }
      res.render(res.theme.admin + '/views/projects/settings', {
        view: 'project-settings',
        project: foundProject,
        users: allUsers,
        title: 'IDSettings Projects',
        brigade: res.locals.brigade
      })
    })
  })
}
