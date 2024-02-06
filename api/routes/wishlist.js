const fs = require('fs-extra');

module.exports.get = async (req, res) => {
  const userFile = fs.readJsonSync(`db/users/${req.apiUserId}.json`);
  const products = fs.readJsonSync(`db/products.json`);

  const favorites = products.filter(({id}) => userFile.favorites.includes(id.toString()))

  return res.status(200).json(favorites || {});
};