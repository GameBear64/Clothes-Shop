const fs = require('fs-extra');
const joi = require('joi');

const { joiValidate, InformationTypes } = require('../../../middleware/validation');

module.exports.post = [
  joiValidate({ id: joi.string().required() }, InformationTypes.PARAMS),
  async (req, res) => {
    const userFile = fs.readJsonSync(`db/users/${req.apiUserId}.json`);
    let isFavorite = true;

    if (!userFile?.favorites) userFile.favorites = [];

    if (userFile.favorites.includes(req.params.id)) {
      const i = userFile.favorites.indexOf(req.params.id);
      userFile.favorites.splice(i, 1);
      isFavorite = false;
    } else {
      userFile.favorites.push(req.params.id);
    }

    fs.writeJsonSync(`db/users/${req.apiUserId}.json`, userFile, { spaces: 2 });

    return res.status(200).json(isFavorite);
  },
];
