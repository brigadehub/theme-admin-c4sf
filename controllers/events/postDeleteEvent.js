var moment = require('moment')
var uuid = require('node-uuid')
require('moment-timezone')

module.exports = {
  method: 'post',
  endpoint: '/events/:eventId/delete',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postDeleteEvent
}

function postDeleteEvent (req, res) {
  var Events = req.models.Events
  Events.remove({id: req.params.eventId}, function (err) {
    if (err) {
      console.log(err)
    }
    req.flash('success', {msg: 'Your event was deleted.'})
    res.redirect('/events/manage')
  })
}
