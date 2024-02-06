const joi = require('joi');
const { joiValidate } = require('../middleware/validation');

module.exports.patch = [
  joiValidate({
    password: joi.string().min(8).max(255).required(),
    newPassword: joi.string().min(8).max(255).required(),
    confirmPassword: joi.string().valid(joi.ref('newPassword')).required().messages({
      'any.only': 'Confirmation password did not match.',
    }),
  }),
  async (req, res) => {
    // ensured existence by auth
    const userFile = fs.readJsonSync(`db/users/${req.apiUserId}.json`);

    const validPassword = await bcrypt.compare(req.body.password, userFile.password);
    if (!validPassword) return res.status(403).json('Incorrect password');

    userFile.password = bcrypt.hashSync(req.body.newPassword, 10);

    fs.writeJsonSync(`db/users/${req.apiUserId}.json`, userFile, { spaces: 2 });

    return res.status(200).json();
  },
];
