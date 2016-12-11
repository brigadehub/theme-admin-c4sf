var nodemailer = require('nodemailer')

module.exports = {
  method: 'post',
  endpoint: '/contact/message/new',
  authenticated: true,
  roles: ['core', 'superAdmin'],
  middleware: [],
  controller: postContactMessage
}

function postContactMessage (req, res) {
  var Users = req.models.Users
  req.assert('name', 'Name cannot be blank').notEmpty()
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('message', 'Message cannot be blank').notEmpty()
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: res.locals.brigade.auth.email.user,
      pass: res.locals.brigade.auth.email.password
    }
  })
  var mailOptions = {
    from: req.body.email,
    to: res.locals.brigade.auth.email.user,
    subject: 'Message from ' + req.body.email,
    text: req.body.message
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: ' + info.response)
  })
  res.redirect('/contact')
}
