module.exports = {
  method: 'post',
  endpoint: '/contact',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postContactsManage
}

function postContactsManage (req, res) {
  var Users = req.models.Users

  var mongooseQuery = {$or: [{'roles.core': true}, {'roles.coreLead': true}, {'roles.superAdmin': true}]}

  Users.find(mongooseQuery, function (err, users) {
    if (err) console.error(err)
    users.forEach(function (user) {
      var userInfo = req.body[user.username]
      // next iteration if userInfo is null
      if (!userInfo) {
        return
      }

      if (!userInfo.showcontact) {
        user.profile.showcontact = false
      } else {
        user.profile.showcontact = true
      }
      user.profile.contactpagerank = userInfo.contactrank
      user.save(function (err) {
        if (err) {
          // save failed
          req.flash('errors', {msg: 'Error! Your Contacts were not updated. Error: ' + err})
          console.log('User update failed.  Error:' + err)
          return res.redirect('contact/edit')
        }
        // save is successfull.
        req.flash('success', {msg: 'Success! You updated contacts.'})
        return res.redirect('contact/edit')
      })
    })
  })
}
