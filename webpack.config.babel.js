export default {
  entry: './src/index.js',
  output: {
    path: './public/',
    filename: 'bundle.js',
  },

  devtool: '#inline-source-map',

  devServer: {
    contentBase: './public',
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
}

// vim: set ts=2 sw=2 et:
