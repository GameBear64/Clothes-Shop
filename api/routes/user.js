const fs = require('fs-extra');
const ofs = require('fs');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const shortHash = require('short-hash');

const { createJWT, cleanObject } = require('../utils');
const { joiValidate, skipIfNoChanges } = require('../middleware/validation');

module.exports.get = async (req, res) => {
  const userFile = fs.readJsonSync(`db/users/${req.apiUserId}.json`);

  return res.status(200).json({ id: req.apiUserId, ...cleanObject(userFile, ['name', 'email']) });
};

module.exports.patch = [
  skipIfNoChanges(),
  joiValidate({
    name: joi.string().min(3).max(50).optional(),
    email: joi.string().min(5).max(255).optional().email(),
  }),
  async (req, res) => {
    // ensured existence by auth
    const userFile = fs.readJsonSync(`db/users/${req.apiUserId}.json`);

    fs.writeJsonSync(
      `db/users/${req.apiUserId}.json`,
      {
        ...userFile,
        name: req.body?.name || userFile.name,
        email: req.body?.email || userFile.email,
      },
      { spaces: 2 }
    );

    const hash = shortHash(req.body?.email || userFile.email);
    if (req.body?.email) {
      ofs.renameSync(`db/users/${req.apiUserId}.json`, `db/users/${hash}.json`);
    }

    return res.status(200).json(createJWT(hash));
  },
];

module.exports.delete = [
  joiValidate({
    password: joi.string().min(8).max(255).required(),
  }),
  async (req, res) => {
    // ensured existence by auth
    const userFile = fs.readJsonSync(`db/users/${req.apiUserId}.json`);

    const validPassword = await bcrypt.compare(req.body.password, userFile.password);
    if (!validPassword) return res.status(403).json('Incorrect password');

    fs.removeSync(`db/users/${req.apiUserId}.json`);

    // TODO: delete comments as well
    // const commentFiles = globSync(`db/comments/*_${req.apiUserId}.json`);

    return res.status(200).json();
  },
];
