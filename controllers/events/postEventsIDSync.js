module.exports = {
  method: 'post',
  endpoint: '/events/:eventId/sync',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postEventsIDSync
}

function postEventsIDSync (req, res) {
  res.redirect('Events/' + req.params.eventID + '/settings')
}
