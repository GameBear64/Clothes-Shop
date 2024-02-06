const joi = require('joi');
const fs = require('fs-extra');
const bcrypt = require('bcryptjs');
const throttle = require('express-throttle');
const shortHash = require('short-hash');

const { createJWT } = require('../utils');
const { joiValidate } = require('../middleware/validation');

module.exports.post = [
  throttle({ burst: 5, period: '10s' }),
  joiValidate({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(5).max(255).required().email(),
    password: joi.string().min(8).max(255).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
  }),
  async (req, res) => {
    const hash = shortHash(req.body.email);

    if (fs.existsSync(`db/users/${hash}.json`)) {
      return res.status(409).json('User with this email already exists');
    }

    fs.outputJsonSync(
      `db/users/${hash}.json`,
      {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      },
      { spaces: 2 }
    );

    return res.status(201).json(createJWT(hash));
  },
];
