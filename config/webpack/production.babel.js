import CleanWebpackPlugin from 'clean-webpack-plugin';
import paths from './paths';

module.exports = {
  mode: 'production',
  output: {
    filename: `${paths.jsFolder}/[name].[hash].js`,
    path: paths.outputPath,
    publicPath: paths.publicPath || '/',
    chunkFilename: '[name].[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin([paths.outputPath.split('/').pop()], {
      root: paths.root
    })
  ],
  devtool: 'source-map'
};
