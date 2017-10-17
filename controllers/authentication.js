const User = require('../models/user')

const jwt = require('jwt-simple');

const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next){
  res.send({token: tokenForUser(req.user)});
}

exports.signup = function ( req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
      return res.status(422).send({error: 'You need provide email and password'});
  }

  User.findOne({email}).then((existingUser) => {

    if(existingUser){
      return res.status(422).send({error: 'Email is in use'});
    }
    if(existingUser){
      return res.status(422).send({error: 'Email is in use'});
    }

    const user = new User({email, password});

    user.save().then((data)=>{
      res.send({token: tokenForUser(user)});
    }).catch((err)=>{
      return next(err);
    });
  });

  
  
  
};