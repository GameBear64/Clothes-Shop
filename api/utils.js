const jwt = require('jsonwebtoken');
const codes = import('referral-codes');

/**
 * Creates a JWT based on a user's information. (_id)
 */
exports.createJWT = user => {
  const expiresIn = 3 * 30 * 24 * 60 * 60; /*3 months*/
  return jwt.sign({ id: user }, process.env.SECRET, { expiresIn });
};

/**
 * Sanitizes HTML by escaping certain characters.
 */
exports.sanitizeHTML = string => string?.replace(/\\/g, '')?.replace(/</g, '&lt;')?.replace(/>/g, '&gt;'); //.replace(/&/g, '&amp;').replace(///g, '&#x2F;');

/**
 * @param {number} length - The length of the code to generate.
 */
exports.getCode = length => codes.generate({ length })[0];

// https://stackoverflow.com/a/32402438/7149508
/**
 * @param {string} wildcard - The wildcard pattern to match against.
 * @param {string} str - The string to be matched.
 * @returns {boolean} True if the string matches the wildcard pattern; otherwise, false.
 */
exports.wildcardMatch = (wildcard, str) => {
  const w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape
  const re = new RegExp(`^${w.replace(/\*/g, '.*').replace(/\?/g, '.')}$`, 'i');
  return re.test(str);
};

/**
 * @param {Object} object - The input object to be cleaned.
 * @param {string[]} desiredFields - An array of field names to include in the cleaned object.
 */
exports.cleanObject = (object, desiredFields) => {
  return Object.assign({}, ...desiredFields.map(field => ([field] in object ? { [field]: object[field] } : {})));
};

/**
 * Removes properties with empty values from an object.
 */
exports.removeEmptyProperties = object => {
  return Object.keys(object)
    .filter(key => object[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: object[key] }), {});
};
