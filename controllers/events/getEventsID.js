var moment = require('moment')
var uuid = require('node-uuid')
require('moment-timezone')

module.exports = {
  method: 'get',
  endpoint: '/events',
  roles: [],
  scopes: [],
  middleware: [],
  controller: getEventsID
}

function getEventsID (req, res) {
  res.render(res.theme.admin + '/views/events/event', {
    view: 'event',
    eventID: req.params.eventID,
    title: 'Events',
    brigade: res.locals.brigade
  })
}
