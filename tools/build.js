/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

import layouts from 'metalsmith-layouts';
import Metalsmith from 'metalsmith';
import sass from 'metalsmith-sass';
import path from 'path';

export default function (baseDir, reload = () => {}) {
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
    .use(layouts({
      directory: './src/pug',
      engine: 'pug',
      rename: true,
    }))
    .use(sass({
      outputDir: originalPath => originalPath.replace('scss', 'css'),
    }))
    .build((err) => {
      if (err) {
        throw err;
      }
      reload();
      console.log('Site build complete!');
    });
}
