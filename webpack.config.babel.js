import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'

export default {
  entry: './src/index.js',
  output: {
    path: './',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map',
  },

  devtool: 'source-map',

  devServer: {
    contentBase: './',
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
    new LodashModuleReplacementPlugin(),
  ]
}

// vim: set ts=2 sw=2 et:
