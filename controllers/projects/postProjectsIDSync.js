module.exports = {
  method: 'post',
  endpoint: '/projects/:projectId/sync',
  authenticated: true,
  roles: ['lead', 'core', 'superAdmin'],
  scopes: ['user:email', 'repo'],
  middleware: [],
  controller: postProjectsIDSync
}

function postProjectsIDSync (req, res) {
  res.redirect('projects/:projectID/settings')
}
