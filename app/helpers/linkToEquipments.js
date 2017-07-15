const safeString = require('./safeString');

module.exports = (links) => links && links.map(name => ({
    name,
    href: `/equipment/#${safeString(name)}`
}));