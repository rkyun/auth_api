const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt= require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function(next){
  const user = this;

  bcrypt.hash(user.password, 10).then((hash)=>{
    user.password = hash;
    next();
  }).catch(()=>{
      const err = new Error('Hashing password gone wrong');
      err._message = 'Hashing password gone wrong';
      next(err);
  });
});

userSchema.statics.findUserByCredentials = function (email, password) {
  const User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (!res) {
          reject();
        }
        resolve(user);
      });
    });
  });
};

const User = mongoose.model('User', userSchema);


module.exports = User;