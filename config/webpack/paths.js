import path from 'path';

module.exports = {
  root: path.resolve(__dirname, '../', '../'),
  publicPath: '/',
  outputPath: path.resolve(__dirname, '../', '../', 'dist'),
  entryPath: path.resolve(__dirname, '../', '../', 'src/index.js'),
  templatePath: path.resolve(__dirname, '../', '../', 'src/index.html'),
  appsPath: path.resolve(__dirname, '../', '../src/apps'),
  corePath: path.resolve(__dirname, '../', '../src/core'),
  staticPath: path.resolve(__dirname, '../', '../src/static'),
  screensPath: path.resolve(__dirname, '../', '../src/screens'),
  componentsPath: path.resolve(__dirname, '../', '../src/core/components'),
  constantsPath: path.resolve(__dirname, '../', '../src/core/constants'),
  servicesPath: path.resolve(__dirname, '../', '../src/core/services'),
  helpersPath: path.resolve(__dirname, '../', '../src/core/helpers'),
  hooksPath: path.resolve(__dirname, '../', '../src/core/hooks'),
  stylesPath: path.resolve(__dirname, '../', '../src/core/styles'),
  iconsPath: path.resolve(__dirname, '../', '../src/core/styles/icons.js'),
  apiPath: path.resolve(__dirname, '../', '../src/core/api'),
  jsFolder: 'js'
};
