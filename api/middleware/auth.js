const jwt = require('jsonwebtoken');
const fs = require('fs');

const { wildcardMatch } = require('../utils');

const noAuthRoutes = [
  { path: '/login', methods: ['POST'] },
  { path: '/register', methods: ['POST'] },
  { path: '/image/*', methods: ['GET'] },
];

exports.checkAuth = async (req, res, next) => {
  const isNoAuthRoute = noAuthRoutes.some(
    route => wildcardMatch(route.path, req.path) && route.methods.includes(req.method)
  );

  if (isNoAuthRoute) return next();

  try {
    const decoded = jwt.verify(req.headers?.jwt, process.env.SECRET);

    const currentUser = fs.existsSync(`db/users/${decoded.id}.json`);
    if (!currentUser) return res.status(401).json('The user belonging to this token no longer exist.');

    req.apiUserId = decoded.id;

    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return res.status(401).json('Not Authorized');

    return res.status(500).json(err.message);
  }
};
