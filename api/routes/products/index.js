const fs = require('fs-extra');

module.exports.get = async (req, res) => {
  const products = fs.readJsonSync(`db/products.json`);

  return res.status(200).json(products);
};
