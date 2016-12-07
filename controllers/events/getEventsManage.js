var moment = require('moment')
var uuid = require('node-uuid')
require('moment-timezone')

module.exports = {
  method: 'get',
  endpoint: '/events/manage',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: getEventsManage
}

function getEventsManage (req, res) {
  var Events = req.models.Events

    Events.find({}, function (err, foundEvents) {
      if (err) console.error(err)
      var mappedEvents = foundEvents.map(function (event) {
        event.localstart = moment.unix(event.start).tz(res.locals.brigade.location.timezone).format('ha z MMMM DD, YYYY')
        return event
      })
      res.render(res.locals.brigade.theme.slug + '/views/events/manage', {
        view: 'event-list-manage',
        title: 'Manage Events',
        allEvents: mappedEvents,
        brigade: res.locals.brigade
      })
    }).sort({start: 1})
  }
