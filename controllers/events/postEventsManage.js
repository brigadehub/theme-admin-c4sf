require('moment-timezone')

module.exports = {
  method: 'post',
  endpoint: '/events/manage',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postEventsManage
}

function postEventsManage (req, res) {
  var Events = req.models.Events

  var mongooseQuery = {}
  //  if (!res.locals.user.isAdmin()) {
  //   //  mongooseQuery.author = res.locals.user.username
  //  }
  Events.find(mongooseQuery, function (err, events) {
    if (err) console.error(err)
    events.forEach(function (event) {
      var eventInfo = req.body[event.id]
      if (eventInfo.delete) {
        event.remove()
        return
      }
      event.title = eventInfo.title
      event.host = eventInfo.host
      event.localstart = eventInfo.localstart
      event.location = eventInfo.location
      event.save(function (err) {
        if (err) throw err
      })
    })
  })
  req.flash('success', {msg: 'Success! You updated events.'})
  return res.redirect('/events/manage/')
}
