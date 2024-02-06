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
    email: joi.string().required(), // Implied validation from /register
    password: joi.string().alphanum().required(),
  }),
  async (req, res) => {
    const hash = shortHash(req.body.email);

    const userFile = fs.readJsonSync(`db/users/${hash}.json`, { throws: false });
    if (!userFile) return res.status(404).json('User with this email does not exist');

    const validPassword = await bcrypt.compare(req.body.password, userFile.password);
    if (!validPassword) return res.status(403).json('Incorrect password');

    return res.status(200).json(createJWT(hash));
  },
];
