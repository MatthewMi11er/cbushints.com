import minimist from 'minimist';
import queue from 'queue';
import BrowserSync from './browsersync';
import Firebase from './firebase';
import metalsmith from './metalsmith';
import webpack from './webpack';

const argv = minimist(process.argv);

function startServer() {
  /**
   * Don't run the dev server when we're deploying
   */
  if (!argv.buildOnly) {
    const bs = new BrowserSync('DevServer', new Firebase())
      .start();

    bs.watch('src/').on('change', () => {
      metalsmith(bs.reload);
    });

    bs.watch('./firebase.json').on('change', () => {
      bs.proxy.restart();
    });
  }
}

const buildQueue = queue({ concurrency: 1 });
buildQueue.push(webpack);
buildQueue.push(metalsmith);
buildQueue.start(startServer);
