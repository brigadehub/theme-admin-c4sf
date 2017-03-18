module.exports = {
  method: 'get',
  endpoint: '/contact/edit',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  middleware: [],
  controller: getContactEdit
}

function getContactEdit (req, res) {
  var Users = req.models.Users
  Users.find({$or: [{'roles.core': true}, {'roles.coreLead': true}, {'roles.superAdmin': true}]}, function (err, foundUsers) {
    if (err) console.error(err)
    res.render(res.theme.admin + '/views/contact/edit', {
      view: 'contact',
      users: foundUsers,
      title: 'Edit Contact',
      brigade: res.locals.brigade
    })
  }).sort({'profile.contactpagerank': 1})
}
