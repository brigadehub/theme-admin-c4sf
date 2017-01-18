module.exports = {
  method: 'get',
  endpoint: '/events/new',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: getEventsNew
}

function getEventsNew (req, res) {
  res.render(res.theme.admin + '/views/events/new', {
    view: 'event-new',
    title: 'New Events',
    brigade: res.locals.brigade
  })
}
