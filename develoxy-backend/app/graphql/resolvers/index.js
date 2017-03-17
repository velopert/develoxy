const Query = require('./Query');
const User = require('./User');
const Post = require('./Post');
const Category = require('./Category');

const { merge } = require('lodash');

module.exports = merge(Query, User, Post, Category);