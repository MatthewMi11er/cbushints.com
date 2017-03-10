import merge from 'webpack-merge';
import paths from '../paths';
import { extractCSS, loadJS } from './parts';

export default merge([{
  entry: paths.entry,
  output: {
    path: paths.build,
    filename: 'js/main.js',
  },

},
  extractCSS({ filename: 'css/style.css', use: ['css-loader', 'sass-loader'] }),
  loadJS(),
]);
