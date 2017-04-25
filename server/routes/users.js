import express from 'express';
import commonValidations from '../shared/validations/signup.js';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user.js';

let router = express.Router();

function validateInput(data, otherValidations) {

  let { errors } = otherValidations(data);

  return Promise.all([
    User.where({ username: data.username }).fetch().then(user => {
      if(user) { errors.username = 'There is other account with this username'; }
    }),
    User.where({ email: data.email }).fetch().then(user => {
      if(user) { errors.email = 'There is other account with this email'; }
    })
  ]).then(() => {
    return {
      errors,
      isValid: isEmpty(errors)
    };
  });
}

router.get('/:identify', (req, res) => {
  User.query({
    select: [ 'username', 'email' ],
    where: { username: req.params.identify },
    orWhere: { email: req.params.identify }
  }).fetch().then(user => {
    res.json({ user });
  });
})

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if(isValid) {
      const { username, password, timezone, email } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);
      User.forge({
        username, email, timezone, password_digest
      }, { hasTimestamps: true }).save()
      .then( user => res.json({success: true}))
      .catch( err => res.status(500).json({error: err}))
    } else {
      res.status(400).json(errors);
    }
  });
});

export default router;
