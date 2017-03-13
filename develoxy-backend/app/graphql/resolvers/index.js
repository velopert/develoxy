const Query = require('./Query');
const User = require('./User');
const Post = require('./Post');

const { merge } = require('lodash');

module.exports = merge(User, Post);