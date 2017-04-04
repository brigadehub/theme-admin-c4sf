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

  var mongooseQuery = {'username': {$in: Object.keys(req.body)}}
  var userPromises = []

  Users.find(mongooseQuery, function (err, users) {
    if (err) console.error(err)
    users.forEach(function (user) {
      userPromises.push(new Promise(function (resolve, reject) {
        var userInfo = req.body[user.username]
        // next iteration if userInfo is null
        if (!userInfo) {
          reject('No user information found for ' + user.username + '.')
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
            reject(err)
          }
          // save is successfull.
          resolve()
        })
      })
      )
    })
    Promise.all(userPromises).then(function () {
      req.flash('success', {msg: 'Success! You updated contacts.'})
      return res.redirect('contact/edit')
    }).catch(function (err) {
      req.flash('errors', {msg: 'Error! Your Contacts were not updated. Error: ' + err})
      console.log('User update failed.  Error:' + err)
      return res.redirect('contact/edit')
    })
  })
}
