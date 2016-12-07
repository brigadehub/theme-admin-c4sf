var slug = require('slug')
var markdown = require('markdown-it')
var mdnh = require('markdown-it-named-headers')
var md = markdown({ html: true }).use(mdnh)

module.exports = {
  method: 'get',
  endpoint: '/projects/new',
  authenticated: true,
  middleware: [],
  controller: getProjectsNew
}

function getProjectsNew (req, res) {
  var Projects = req.models.Projects
  var Users = req.models.Users

  Users.find({}, function (err, allUsers) {
    if (err) console.error(err)
    res.render(res.locals.brigade.theme.slug + '/views/projects/new', {
      view: 'project-new',
      users: allUsers,
      title: 'New Project',
      brigade: res.locals.brigade
    })
  })
}
