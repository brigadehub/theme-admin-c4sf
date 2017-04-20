const slug = require('slugify')
const _ = require('lodash')

module.exports = {
  method: 'post',
  endpoint: '/projects/:projectId',
  authenticated: true,
  roles: ['lead', 'core', 'superAdmin'],
  scopes: ['user:email', 'repo'],
  middleware: [],
  controller: postProjectsIDSettings
}

function postProjectsIDSettings (req, res) {
  const Projects = req.models.Projects
  if (!req.user.teams.lead.includes(req.params.projectId) && !req.user.roles.superAdmin && !req.user.roles.core) {
    req.flash('errors', { msg: 'You are not authorized to access this resource.' })
    return res.redirect('/projects')
  }
  Projects.find({'id': req.params.projectId}, function (err, foundProject) {
    if (err) console.error(err)
    const project = foundProject[0]
    if (project) {
      project.categories = []
      project.needs = []
      project.data = []
      project.keywords = []
      project.name = req.body.title || ''
      project.oldId = project.id
      project.id = slug(project.name)
      project.active = req.body.active || false
      project.status = req.body.status || ''
      project.politicalEntity = req.body.politicalEntity || ''
      project.geography = req.body.geography || ''
      project.homepage = req.body.homepage || ''
      project.repositories = req.body.repositories || []
      if (typeof project.repositories === 'string') project.repositories = [project.repositories]
      project.repositories = _.reject(project.repositories, (repo) => {
        return repo === ''
      })
      project.checkFromGithub = req.body.checkFromGithub || false
      if (project.checkFromGithub && !project.checkFromGithubAs.length) {
        project.checkFromGithubAs = req.user.username
      }
      project.description = req.body.description || ''
      project.content = req.body.content || ''
      project.thumbnailUrl = req.body.thumbnailUrl || ''
      project.bannerUrl = req.body.bannerUrl || ''
      project.leads = req.body.leads || []
      if (typeof project.leads === 'string') project.leads = [project.leads]
      project.members = req.body.members || []
      if (typeof project.members === 'string') project.members = [project.members]
      console.log(project.leads)
      if (req.body.needs) {
        if (typeof req.body.needs === 'string' && req.body.needs.indexOf(',') > -1) {
          req.body.needs.replace(/\s/g, '').split(',').forEach(function (need) {
            project.needs.push(need)
          })
        } else if (typeof req.body.needs === 'string') {
          project.needs.push(req.body.needs)
        } else {
          project.needs = project.needs.concat(req.body.needs)
        }
      }
      if (req.body.keywords) {
        if (typeof req.body.keywords === 'string' && req.body.keywords.indexOf(',') > -1) {
          req.body.keywords.replace(/\s/g, '').split(',').forEach(function (keyword) {
            project.keywords.push(keyword)
          })
        } else if (typeof req.body.keywords === 'string') {
          project.keywords.push(req.body.keywords)
        } else {
          project.keywords = project.keywords.concat(req.body.keywords)
        }
      }
      return project.save(function (err) {
        if (err) console.error(err)
        req.flash('success', { msg: 'Success! You have updated your project.' })
        res.redirect('/admin/projects/' + project.id + '/settings')
      })
    }
    req.flash('errors', { msg: 'Could not find project with id ' + req.params.projectId })
    res.redirect('/projects')
  })
}
