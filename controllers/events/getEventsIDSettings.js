var moment = require('moment')
var uuid = require('node-uuid')
require('moment-timezone')

module.exports = {
  method: 'get',
  endpoint: '/events/:eventId/settings',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: getEventsIDSettings
}

function getEventsIDSettings (req, res) {
  var Events = req.models.Events
    Events.find({id: req.params.eventId}, function (err, foundEvent) {
      if (err) console.log(err)
      var startDigits = moment.unix(foundEvent[0].start).tz(res.locals.brigade.location.timezone).format('MMM, D, YYYY, HH, mm').split(',')
      var endDigits = moment.unix(foundEvent[0].end).tz(res.locals.brigade.location.timezone).format('MMM, D, YYYY, HH, mm').split(',')
      res.render(res.theme.public + '/views/events/settings', {
        view: 'event-settings',
        event: foundEvent[0],
        title: 'Event Settings',
        start: startDigits,
        end: endDigits,
        brigade: res.locals.brigade
      })
    })
  }
