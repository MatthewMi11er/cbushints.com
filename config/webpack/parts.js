import ExtractTextPlugin from 'extract-text-webpack-plugin';
import paths from '../paths';

export function extractCSS({ filename, include, exclude, use }) {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename,
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          use: plugin.extract({
            use,
            fallback: 'css-loader',
          }),
        },
      ],
    },
    plugins: [plugin],
  };
}

export function loadJS() {
  return {
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
        modernizr$: paths.modernizr,
      },
    },
  };
}
