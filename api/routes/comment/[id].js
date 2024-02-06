const joi = require('joi');
const fs = require('fs-extra');
const { joiValidate, InformationTypes, skipIfNoChanges } = require('../../middleware/validation');

module.exports.post = [
  joiValidate({ id: joi.string().required() }, InformationTypes.PARAMS),
  joiValidate({
    text: joi.string().min(30).max(10000).required(),
    rating: joi.number().min(1).max(5).required(),
  }),
  async (req, res) => {
    if (fs.existsSync(`db/comments/${req.params.id}_${req.apiUserId}.json`)) {
      return res.status(403).json('Can not comment on a product twice');
    }

    fs.outputJsonSync(
      `db/comments/${req.params.id}_${req.apiUserId}.json`,
      { ...req.body, date: Math.floor(new Date() / 1000) },
      { spaces: 2 }
    );

    return res.status(201).json();
  },
];

module.exports.patch = [
  skipIfNoChanges(),
  joiValidate({ id: joi.string().required() }, InformationTypes.PARAMS),
  joiValidate({
    text: joi.string().min(30).max(10000).optional(),
    rating: joi.number().min(1).max(5).optional(),
  }),
  async (req, res) => {    
    const commentFile = fs.readJsonSync(`db/comments/${req.params.id}_${req.apiUserId}.json`, { throws: false });
    if (!commentFile) return res.status(404).json();

    fs.writeJsonSync(
      `db/comments/${req.params.id}_${req.apiUserId}.json`,
      { ...commentFile, ...req.body },
      { spaces: 2 }
    );

    return res.status(200).json();
  },
];

module.exports.delete = [
  joiValidate({ id: joi.string().required() }, InformationTypes.PARAMS),
  async (req, res) => {
    if (!fs.existsSync(`db/comments/${req.params.id}_${req.apiUserId}.json`)) {
      return res.status(404).json();
    }

    fs.removeSync(`db/comments/${req.params.id}_${req.apiUserId}.json`);

    return res.status(200).json();
  },
];
