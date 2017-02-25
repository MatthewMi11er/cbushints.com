const path = require('path');

module.exports = {
  entry: './src/design/js/main.js',
  output: {
    path: 'dist/js',
    filename: 'main.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader',
        query: {
          presets: [[
            'env',
            {
              targets: {
                browsers: ['last 2 versions', 'safari >= 7'],
              },
            },
          ]],
        },
      },
      {
        test: /modernizr.js$/,
        loader: 'modernizr-loader',
      },
    ],
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, './modernizr.js'),
    },
  },
};
