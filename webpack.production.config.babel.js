import webpack from 'webpack'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'

export default {
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new LodashModuleReplacementPlugin(),
  ]
}

// vim: set ts=2 sw=2 et:
