
/**
 *  Exports
 */

module.exports = {
  method: 'post',
  endpoint: '/brigade/css-override',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  scopes: ['user:email', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook'],
  middleware: [],
  controller: postBrigade
}

/**
 *  Controller
 */
function postBrigade (req, res, next) {
  var Brigade = req.models.Brigade
  Brigade.find({slug: res.locals.brigade.slug}, function (err, results) {
    if (err) {
      console.error(err)
      req.flash('error', { msg: 'An error has occurred. Check console.' })
    }
    var thisBrigade = results[0]
    thisBrigade.cssOverride = req.body.cssOverride
    thisBrigade.save(function (err, results) {
      if (err) {
        console.error(err)
        req.flash('error', { msg: 'An error has occurred. Check console.' })
        return res.redirect('/admin/brigade')
      }
      req.flash('success', { msg: "Success! You've updated your brigade." })
      res.redirect('/admin/brigade')
    })
  })
}
