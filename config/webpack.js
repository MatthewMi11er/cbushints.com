const path = require('path');

module.exports = {
  entry: './src/design/js/main.js',
  output: {
    path: 'dist/js',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [[
              'env',
              {
                modules: false,
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7'],
                },
              },
            ]],
          },
        }],
      },
      {
        test: /modernizr.js$/,
        use: ['modernizr-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, './modernizr.js'),
    },
  },
};
