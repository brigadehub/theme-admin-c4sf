module.exports = {
  method: 'get',
  endpoint: '/projects/new',
  authenticated: true,
  middleware: [],
  controller: getProjectsNew
}

function getProjectsNew (req, res) {
  var Users = req.models.Users

  Users.find({}, function (err, allUsers) {
    if (err) console.error(err)
    res.render(res.theme.admin + '/views/projects/new', {
      view: 'project-new',
      users: allUsers,
      title: 'New Project',
      brigade: res.locals.brigade
    })
  })
}
