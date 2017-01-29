/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const layouts = require('metalsmith-layouts');
const Metalsmith = require('metalsmith');
const sass = require('metalsmith-sass');

Metalsmith(__dirname)
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
    outputDir: originalPath => originalPath.replace("scss", "css"),
  }))
  .build((err) => {
    if (err) {
      throw err;
    }
    console.log('Site build complete!');
  });
