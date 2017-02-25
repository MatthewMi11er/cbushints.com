import minimist from 'minimist';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

const argv = minimist(process.argv);

const config = {
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

let production = {};
if (argv.production) {
  production = {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
        },
        comments: false,
      }),
    ],
  };
}

export default merge(config, production);
