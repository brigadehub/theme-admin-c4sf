module.exports = {
  method: 'get',
  endpoint: '/events/new',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: getEventsNew
}

function getEventsNew (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/events/new', {
    view: 'event-new',
    title: 'New Events',
    brigade: res.locals.brigade
  })
}
