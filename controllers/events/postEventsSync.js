var moment = require('moment')
var uuid = require('node-uuid')
require('moment-timezone')

module.exports = {
  method: 'post',
  endpoint: '/events/sync',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postEventsSync
}

function postEventsSync (req, res) {
  var Events = req.models.Events
  var url = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=' + res.locals.brigade.meetup + '&page=50'
  Events.fetchMeetupEvents(url).then(function (value) {
    req.flash('success', {msg: 'Success! You have successfully synced events from Meetup.'})
    res.redirect('/events/manage')
  }).catch(function (error) {
    req.flash('errors', {msg: error})
    res.redirect('/events/manage')
  })
}
