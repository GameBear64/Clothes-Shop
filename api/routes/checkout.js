const fs = require('fs-extra');
const joi = require('joi');

const { joiValidate } = require('../middleware/validation');

module.exports.post = [
  joiValidate({
    items: joi
      .array()
      .items(
        joi.object({
          id: joi.alternatives().try(
            joi.string(),
            joi.number()
          ),
          q: joi.alternatives().try(
            joi.string(),
            joi.number()
          ),
        })
      )
      .required(),
  }),
  async (req, res) => {
    const userFile = fs.readJsonSync(`db/users/${req.apiUserId}.json`);

    if (!userFile?.history) userFile.history = {};

    userFile.history[Math.floor(new Date() / 1000)] = req.body.items;

    fs.writeJsonSync(`db/users/${req.apiUserId}.json`, userFile, { spaces: 2 });

    return res.status(200).json();
  },
];

// history: {
//   'timestamp': [{id: 'itemID', q: 1}],
//   'timestamp': [{id: 'itemID', q: 3}, {id: 'itemID', q: 5}],
// }
