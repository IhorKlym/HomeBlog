require('@babel/register');
const webpackMerge = require('webpack-merge');
const common = require('./config/webpack/common.babel');

/* eslint-disable global-require,import/no-dynamic-require */
const env = process.env.NODE_ENV || 'development';
const envConfig = require(`./config/webpack/${env}.babel`);
module.exports = webpackMerge(common, envConfig);
