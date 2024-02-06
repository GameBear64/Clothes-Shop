const fs = require('fs-extra');
const joi = require('joi');
const { globSync } = require('glob');

const { joiValidate, InformationTypes } = require('../../../middleware/validation');

module.exports.get = [
  joiValidate({ id: joi.string().required() }, InformationTypes.PARAMS),
  async (req, res) => {
    const products = fs.readJsonSync(`db/products.json`);

    const specifiedProduct = products.find(p => p.id == req.params.id);
    if (!specifiedProduct) return res.status(404).json('Product not found');

    const commentFiles = globSync(`db/comments/${req.params.id}_*.json`);

    const comments = commentFiles.map(file => {
      const userId = /\/(?<product>\d)_(?<user>.*?).json/gi.exec(file).groups.user;

      const comment = fs.readJsonSync(file);
      const author = fs.readJsonSync(`db/users/${userId}.json`);

      return { name: author.name, authorId: userId, ...comment };
    });

    // check if its favorite
    const userFile = fs.readJsonSync(`db/users/${req.apiUserId}.json`, { throws: false });
    const isFavorite = userFile.favorites?.includes(specifiedProduct.id.toString()) || false;

    return res.status(200).json({ ...specifiedProduct, isFavorite, comments });
  },
];
