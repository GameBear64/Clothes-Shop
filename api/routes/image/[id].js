const fs = require('fs');
var path = require('path');
const joi = require('joi');
const sharp = require('sharp');

const { joiValidate, InformationTypes } = require('../../middleware/validation');

const turnSizeIntoNumberBeforeValidation = () => (req, res, next) => {
  if (req.query?.size) req.query.size = Number(req.query.size);
  next();
};

module.exports.get = [
  turnSizeIntoNumberBeforeValidation(),
  joiValidate({ id: joi.string().required() }, InformationTypes.PARAMS),
  joiValidate({ size: joi.number().max(500) }, InformationTypes.QUERY),
  async (req, res) => {
    const filePath = `db/images/${req.params.id}.jpg`;
    const currentFile = fs.existsSync(filePath);
    if (!currentFile) return res.status(404).json('File not found');

    if (req.query?.size) {
      res.writeHead(200, { 'Content-Type': 'image/jpg' });
      return sharp(filePath).resize(req.query.size, req.query.size, { fit: 'inside' }).pipe(res);
    }

    res.sendFile(path.resolve(filePath));
  },
];
