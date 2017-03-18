var moment = require('moment')
require('moment-timezone')

module.exports = {
  method: 'post',
  endpoint: '/events/:eventId',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postEventsIDSettings
}

function postEventsIDSettings (req, res) {
  var Events = req.models.Events
  Events.findOne({id: req.params.eventId}, function (err, thisEvent) {
    if (err) console.log(err)
    if (!thisEvent) {
      console.log('The event ' + req.params.eventId + ' was not found')
      req.flash('errors', {msg: 'An error occurred'})
      return res.redirect('/admin/events/manage')
    }
    var startString = req.body.startday + req.body.startmonth + req.body.startyear + req.body.starthour + req.body.startminute
    var endString = req.body.endday + req.body.endmonth + req.body.endyear + req.body.endhour + req.body.endminute
    console.log(startString)
    thisEvent.title = req.body.title
    thisEvent.location = req.body.location
    thisEvent.host = req.body.host
    thisEvent.start = moment.tz(startString, 'DD-MMM-YYYY HH:mm:ss', res.locals.brigade.location.timezone).format('X')
    thisEvent.end = moment.tz(endString, 'DD-MMM-YYYY HH:mm:ss', res.locals.brigade.location.timezone).format('X')
    if (thisEvent.end < thisEvent.start) {
      req.flash('errors', {msg: 'You can not have an event with an end time earlier than its start time.'})
      res.redirect('/events/' + req.params.eventId + '/settings')
      return
    }
    thisEvent.url = req.body.url
    thisEvent.description = req.body.description
    thisEvent.save(function (err) {
      if (err) console.log(err)
    })
    req.flash('success', {msg: 'Success! You have updated your event.'})
    res.redirect('/events/' + req.params.eventId + '/settings')
  })
}
