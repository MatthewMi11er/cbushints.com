/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import minimist from 'minimist';
import { Firebase, BrowserSync } from './tools/servers';
import build from './tools/build';

const argv = minimist(process.argv);

build();

/**
 * Don't run the dev server when we're deploying
 */
if (!argv.deploy) {
  const bs = new BrowserSync('TestServer', new Firebase());
  bs.start(bs.reload);
  bs.watch(build);
}
