const passport = require('passport');
const {User} = require('../db/models');

const register = (req, res, next) => {
  User.register(req.body)
    .then(() => {
      res.redirect('/login');
    })
    .catch((error) => next(error.message))
  
  // Another way
  // const {username, password} = req.body;  
  
  // const encryptedPassword = bcrypt.hashSync(password, 10);
  // User.create({
  //   username,
  //   password: encryptedPassword
  // }).then(() => {
  //       res.redirect('/login');
  // }).catch((error) => next(error.message))
};

const showRegisterPage = (req, res) => {
  res.render('register');
}

const showLoginPage = (req, res) => {
  res.render('login');
}

const login =  (req, res, next) => {
  return passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true
  })(req, res, next)
}

const whoami = (req, res) => {
  /* req.user adalah instance dari User Model, hasil autentikasi dari passport. */
  console.log(req);
  res.render('profile', req.user.dataValues)
}

const logout = (req, res) => {
  req.logout();
  res.redirect('/login');
}

module.exports = {
  register,
  showRegisterPage,
  showLoginPage,
  login,
  whoami,
  logout
};
