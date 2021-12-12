import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

import paths from './paths';

const port = process.env.PORT || 4000;

module.exports = {
  devServer: {
    hot: false,
    inline: false,
    liveReload: false,
    port
  },
  entry: paths.entryPath,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js'],
    alias: {
      apps: paths.appsPath,
      core: paths.corePath,
      helpers: paths.helpersPath,
      hooks: paths.hooksPath,
      services: paths.servicesPath,
      components: paths.componentsPath,
      constants: paths.constantsPath,
      screens: paths.screensPath,
      static: paths.staticPath,
      styles: paths.stylesPath,
      icons: paths.iconsPath,
      api: paths.apiPath
    }
  },
  plugins: [
    new Dotenv({
      systemvars: process.env.NODE_ENV === 'production'
    }),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      favicon: 'src/static/favicon.ico',
      assetsPath: paths.publicPath || '',
      realDataTransPayment: process.env.REAL_DATATRANS_PAYMENTS,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    })
  ]
};
