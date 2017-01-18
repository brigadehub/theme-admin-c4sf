var moment = require('moment')
var uuid = require('node-uuid')
require('moment-timezone')

module.exports = {
  method: 'post',
  endpoint: '/events/delete',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postDeleteAllEvents
}

function postDeleteAllEvents (req, res) {
  var Events = req.models.Events
    Events.remove({}, function (err) {
      if (err) {
        console.log(err)
      }
      req.flash('success', {msg: 'Your events were deleted.'})
      res.redirect('/events/manage')
    })
  }
