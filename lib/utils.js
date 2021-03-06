var
  _ = require('lodash'),
  utils = {
    capitalizeFirstLetter: capitalizeFirstLetter,
    hashCode: hashCode,
    startsWith: startsWith,
    endsWith: endsWith,
    stripSurroundingQuotes: stripSurroundingQuotes,
    normalizeEmail: normalizeEmail,
    emailToContactsAddresses: emailToContactsAddresses,
    addressToName: addressToName,
    toTitleCase: toTitleCase,
    replaceSeperatorWithSpace: replaceSeperatorWithSpace,
    getUserName: getUserName
  };



module.exports = utils;


function capitalizeFirstLetter(string) {
  if (string == null) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function hashCode(string) {
  var hash = 0,
    i, chr, len;
  if (string.length === 0) return hash;
  for (i = 0, len = string.length; i < len; i++) {
    chr = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function startsWith(string, chars) {
  if (string == null) return false;
  return string.indexOf(chars) === 0;
}

function endsWith(string, chars) {
  if (string == null) return false;
  return string.indexOf(chars, string.length - chars.length) !== -1;
}

function stripSurroundingQuotes(string) {
  if (string == null) return '';
  return string.replace(/^['"]|['"]$/gmi, '');
}

function normalizeEmail(string) {
  return stripSurroundingQuotes(string).toLowerCase().trim();
}

function emailToContactsAddresses(email) {
  var
    userEmail = normalizeEmail(email.user_email),
    from = email.from,
    to = email.to || [],
    cc = email.cc || [],
    bcc = email.bcc || [],
    addresses = [];

  addresses = to.concat(cc).concat(bcc);
  addresses.push(from);

  return _.chain(addresses)
    .pluck('address')
    .without(null, undefined, '')
    .map(addressCleaner)
    .without(userEmail)
    .value();


  function addressCleaner(address) {
    if (address == null) return '';
    return normalizeEmail(address);
  }

}

function getUserName(string) {
  if (string == null) return '';
  return string.replace(/@.*/, '');
}

function replaceSeperatorWithSpace(string) {
  if (string == null) return '';
  return string.replace(/[._-]/, ' ');
}

function toTitleCase(str) {
  if (str == null) return '';
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function addressToName(address) {
  var
    strippedAddress = normalizeEmail(address),
    userName = getUserName(strippedAddress),
    splitName = replaceSeperatorWithSpace(userName);

  return toTitleCase(splitName);

}