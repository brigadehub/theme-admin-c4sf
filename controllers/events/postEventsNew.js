var moment = require('moment')
var uuid = require('node-uuid')
require('moment-timezone')

module.exports = {
  method: 'post',
  endpoint: '/events/new',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postEventsNew
}

function postEventsNew (req, res) {
  var Events = req.models.Events

    var newEvent = new Events(req.body)
    newEvent.id = uuid.v1()
    var startString = req.body.startday + req.body.startmonth + req.body.startyear + req.body.starthour + req.body.startminute
    var endString = req.body.endday + req.body.endmonth + req.body.endyear + req.body.endhour + req.body.endminute
    newEvent.start = moment.tz(startString, 'DD-MMM-YYYY HH:mm:ss', res.locals.brigade.location.timezone).format('X')
    newEvent.end = moment.tz(endString, 'DD-MMM-YYYY HH:mm:ss', res.locals.brigade.location.timezone).format('X')
    if (newEvent.end < newEvent.start) {
      req.flash('errors', {msg: 'You can not create an event with an end time earlier than its start time.'})
      res.redirect('/events/new')
      return
    }
    newEvent.save(function (err) {
      if (err) console.error(err)
    })
    req.flash('success', {msg: 'Success! You have created an event.'})
    res.redirect('/events/new')
  }
