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
  var eventPromises = []

  Events.find(mongooseQuery, function (err, events) {
    if (err) console.error(err)
    events.forEach(function (event) {
      eventPromises.push(new Promise(function (resolve, reject) {
        var eventInfo = req.body[event.id]
        if (eventInfo.delete) {
          event.remove()
          resolve()
        }
        event.title = eventInfo.title
        event.host = eventInfo.host
        event.localstart = eventInfo.localstart
        event.location = eventInfo.location
        event.save(function (err) {
          if (err) {
            // save failed
            reject(err)
          }
          // save is successfull.
          resolve()
        })
      })
      )
    })
    Promise.all(eventPromises).then(function () {
      req.flash('success', { msg: 'Success! You updated events.' })
      return res.redirect('/admin/events/manage/')
    }).catch(function (err) {
      req.flash('errors', { msg: 'Error! Your Events were not updated. Error: ' + err.message })
      console.log('Event update failed.  Error:' + err)
      return res.redirect('/admin/events/manage/')
    })
  })
}
