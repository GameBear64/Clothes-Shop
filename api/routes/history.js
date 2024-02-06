const fs = require('fs-extra');

module.exports.get = async (req, res) => {
  const userFile = fs.readJsonSync(`db/users/${req.apiUserId}.json`);
  const products = fs.readJsonSync(`db/products.json`);

  for (const timestamp in userFile.history) {
    userFile.history[timestamp] = userFile.history[timestamp].map(prod => (
      {...products[prod.id], quantity: prod.q}
    ));   
  }

  return res.status(200).json(userFile.history || {});
};

// history: {
//   'timestamp': [{id: 'itemID', q: 1}],
//   'timestamp': [{id: 'itemID', q: 3}, {id: 'itemID', q: 5}],
// }
