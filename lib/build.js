import minimist from 'minimist';
import BrowserSync from './browsersync';
import Firebase from './firebase';
import build from './metalsmith';

const argv = minimist(process.argv);

build();

/**
 * Don't run the dev server when we're deploying
 */
if (!argv.buildOnly) {
  const bs = new BrowserSync('DevServer', new Firebase())
    .start();

  bs.watch('src/').on('change', () => {
    build(bs.reload);
  });

  bs.watch('./firebase.json').on('change', () => {
    bs.proxy.restart();
  });
}
