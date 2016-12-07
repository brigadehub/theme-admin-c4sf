var moment = require('moment')
var uuid = require('node-uuid')
require('moment-timezone')

module.exports = {
  method: 'get',
  endpoint: '/events',
  roles: [],
  scopes: [],
  middleware: [],
  controller: getEvents
}

function getEvents (req, res) {
  var Events = req.models.Events
  Events.find({}, function (err, foundEvents) {
    if (err) console.error(err)
    var mappedEvents = foundEvents.filter(function (event) {
      return event.start > moment().unix()
    }).map(function (event) {
      event.convertedstart = moment.unix(event.start).tz(res.locals.brigade.location.timezone).format('MMMM DD, YYYY ha z')
      return event
    })
    res.render(res.locals.brigade.theme.slug + '/views/events/index', {
      view: 'event-list',
      events: mappedEvents,
      upcomingevents: mappedEvents.slice(0, 10),
      title: 'Events',
      brigade: res.locals.brigade
    })
  }).sort({start: 1})
}
