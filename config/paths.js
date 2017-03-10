import path from 'path';

const rootDir = path.resolve(__dirname, '../');
const designDir = path.resolve(rootDir, 'src/design');

export default {
  entry: [
    path.resolve(designDir, 'js/main.js'),
    path.resolve(designDir, 'scss/style.scss'),
  ],
  build: path.join(rootDir, 'dist'),
  modernizr: path.resolve(__dirname, 'modernizr.js'),
};
