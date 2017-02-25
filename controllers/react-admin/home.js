module.exports = {
  method: 'get',
  endpoint: '*',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  spa: true,
  controller: getHome
}

function getHome (req, res) {
  res.render(res.theme.admin + '/views/react', {
    view: 'admin',
    title: 'Admin',
    user: req.user,
    brigade: res.locals.brigade
  })
}
