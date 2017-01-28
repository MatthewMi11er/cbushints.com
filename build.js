/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

const Metalsmith = require('metalsmith');

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'cbushints.com',
      url: 'https://cbushints.com',
    },
  })
  .source('./src')
  .destination('./dist')
  .build((err) => {
    if (err) {
      throw err;
    }
    console.log('Site build complete!');
  });
