/* eslint-disable no-console */

import assets from 'metalsmith-assets';
import contentful from 'contentful-metalsmith';
import dataMarkdown from 'metalsmith-data-markdown';
import glob  from 'glob';
import handlebars from 'handlebars';
import layouts from 'metalsmith-layouts';
import markdown  from 'metalsmith-markdown';
import Metalsmith from 'metalsmith';
import path from 'path';

// add custom helpers to handlebars
// https://github.com/superwolff/metalsmith-layouts/issues/63
//
// using the global handlebars instance
glob.sync('helpers/*.js').forEach((fileName) => {
  const helper = fileName.split('/').pop().replace('.js', '');

  handlebars.registerHelper(
    helper,
    require(`./${fileName}`)
  )
});

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
    .use(contentful({
      space_id: 'l0c46cbqpyy5',
      access_token: '0ac9fd928aaab13c3c3c2f6894349785bab2ff483f90f738d89da1eda1de1e35',
      common: {
        featured_author: {
          limit: 1,
          filter: {
            'sys.id[in]': '6EczfGnuHCIYGGwEwIqiq2',
          },
        },
      },
    }))
    //.use(layouts({
    //  engine: 'handlebars',
    //  partials: 'partials',
    //}))
    .use(layouts({
      directory: './src/design/pug',
      engine: 'pug',
      rename: true,
    }))
    .use(assets({
      source: 'assets/',
      destination: 'assets/',
    }))
    //.use(sass({
    //  outputStyle: 'compressed',
    //}))
    .use(markdown())
    .use(dataMarkdown({
      removeAttributeAfterwards: true,
    }))
    .build((err) => {
      if (err) {
        throw err;
      }
      console.log('Site build complete!');
      done();
    });
}
