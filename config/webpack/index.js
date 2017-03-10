import minimist from 'minimist';
import merge from 'webpack-merge';
import common from './common';
import development from './development';
import production from './production';

const argv = minimist(process.argv);

export default function () {
  if (argv.production) {
    return merge(common, production);
  }

  return merge(common, development);
}
