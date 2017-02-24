/* eslint-disable no-console */

import minimist from 'minimist';
import Firebase from './firebase';
import BrowserSync from './browsersync';
import build from './metalsmith';

const argv = minimist(process.argv);

build();

/**
 * Don't run the dev server when we're deploying
 */
if (!argv.buildOnly) {
  const bs = new BrowserSync('TestServer', new Firebase());
  bs.start(bs.reload);
  bs.watch(build);
}
