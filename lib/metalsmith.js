/* eslint-disable no-console */

import layouts from 'metalsmith-layouts';
import Metalsmith from 'metalsmith';
import path from 'path';

export default function (done = () => {}) {
  Metalsmith(path.dirname(__dirname))
    .metadata({
      site: {
        description: '',
        title: 'CBusHints',
        url: 'https://cbushints.com',
      },
    })
    .source('./src/content')
    .destination('./dist')
    .clean(false)
    .use(layouts({
      directory: './src/design/pug',
      engine: 'pug',
      rename: true,
    }))
    .build((err) => {
      if (err) {
        throw err;
      }
      console.log('Site build complete!');
      done();
    });
}
